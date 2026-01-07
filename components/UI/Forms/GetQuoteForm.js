// components/GetQuoteForm.js

"use client";

import React, { useState } from "react";
import Input from './InputFields/Input';
import { getQuoteFormData } from "@/utils/getQuoteFormData";
import { servicePropertyMap } from "@/utils/getQuoteFormData"; // Import the service mapping
import LoadingBtn from "../Buttons/LoadingBtn";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import styled from "@emotion/styled";
import axios from "axios";
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import { useRouter } from 'next/navigation';
import Typography from "@mui/material/Typography";
import GoogleMapsLoader from "@/components/GoogleMaps/GoogleMapsLoader";
import GoogleAutocomplete from "@/components/GoogleMaps/GoogleAutoComplete";
export default function GetQuoteForm({ className, formName = "Get a Quote Form", title = "Please fill out a form", hideTitle=false, hubspotPortalId, hubspotFormId }) {
    const router = useRouter();

    const [formData, setFormData] = useState({
        firstname: '',   // Default empty string to make it controlled
        email: '',
        phone: '',
        pickUpAddress: '', 
           dropOffAddress: '', 
        propertyType: '',
        service: [],
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [newSubmission, setNewSubmission] = useState(false);
    const [mapsLoaded, setMapsLoaded] = useState(false);

    const handleChange = (id, value, isSelectMultiple) => {
        let newValue = value.target ? value.target.value : value;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: newValue,
        }));

        // Reset errors on change
        if (errors[id]) {
            setErrors({ ...errors, [id]: false });
        }
    };
 
    const handleBlur = (id, validationFunction) => {
        if (!validationFunction(formData[id])) {
            setErrors({ ...errors, [id]: true });
        }
    };

    // Submit handler 
    const submitHandler = (e) => {
        e.preventDefault(); // Prevent default form submission if using form tag

        let allFieldsValid = true;
        const newErrors = {};

        // Loop through each field to check if it's required and valid
        getQuoteFormData.forEach(field => {
            if (field.required) {
                if (field.type === 'chip') {
                    if (!formData[field.id] || formData[field.id].length === 0) {
                        newErrors[field.id] = true;
                        allFieldsValid = false;
                    }
                } else if (!formData[field.id] || !field.validation(formData[field.id])) {
                    newErrors[field.id] = true;
                    allFieldsValid = false;
                }
            }
        });

        setErrors(newErrors);
        // If any required field is invalid, stop and don't make API calls
        if (!allFieldsValid) {
            return; // Stop the function if any field is invalid o  r empty
        }

        const dataPayload = {
          email: formData.email,
          formName: formName,
          message: `First Name: ${formData.firstname} \nEmail: ${formData.email} \nPhone Number: ${formData.phone} \n Pick up Address: ${formData.pickUpAddress} \n Drop Off Address: ${formData.dropOffAddress} \nProperty Type: ${formData.propertyType} \nServices Required: ${formData['service'].join(", ")}  \n Message: ${formData.message} `,
          portalID: `${hubspotPortalId}`,
          hubspotFormID: `${hubspotFormId}`,
          hubspotFormObject: [
              { name: "firstname", value: formData.firstname },
              { name: "email", value: formData.email },
              { name: "phone", value: formData.phone },
              { name: "pick_up_address", value: formData.pickUpAddress },
                            { name: "drop_off_address", value: formData.dropOffAddress },

              { name: "property_type", value: formData.propertyType },
              { name: "services_required", value: formData['service'].join(", ") },
              { name: "message", value: formData.message },
          ]
      };

        setIsLoading(true);

        // Hubspot config
        var configHubspot = {
            method: 'post',
            url: '/api/submit-hubspot-form',
            headers: { 'Content-Type': 'application/json' },
            data: dataPayload
        };
        // Mailgun config
        var configSendMail = {
            method: 'post',
            url: '/api/sendmail',
            headers: { 'Content-Type': 'application/json' },
            data: dataPayload
        };

        // const facebookData = { 
        //     method: 'post', 
        //     url: '/api/facebook-conversion-api',
        //     headers: { 'Content-Type': 'application/json' },
        //     data: { 
        //         data: {
        //         event: "Lead", 
        //         firstName: formData.firstname,
        //         email: formData.email,
        //         phone: formData.phone,
        //         county: "Bay of Plenty", 
        //         eventSourceUrl: window.location.href, 
        //         serviceRequested: formData['service'].join(", ")
        //     } 
               
        //     }
        // }

        Promise.all([axios(configHubspot), axios(configSendMail)])
            .then(function (response) {
                if (response[0].status === 200) {
                    setIsLoading(false);
                    setIsSuccess(true);
                    setNewSubmission(false);
                    setError(false);
                    
                         if (typeof window !== "undefined" && window.dataLayer) {
            window.dataLayer.push({
              event: "quote_form_submission",
              formName: "Moving Quote",
              formData: {
                firstName: firstName,
                email: formData.email,
                phone: formData.phone,
                street: `${googleAdsAddress.pickUpAddress.streetNumber} ${googleAdsAddress.pickUpAddress.streetName}`,
                city: googleAdsAddress.pickUpAddress.city,
                region: googleAdsAddress.pickUpAddress.region,
                postCode: googleAdsAddress.pickUpAddress.postalCode,
                gclid: clickIds.gclid,
                gbraid: clickIds.gbraid,
                wbraid: clickIds.wbraid,
                fbclid: clickIds.fbclid,
                fbc: clickIds.fbc,
                fbp: clickIds.fbp,
              },
            });
          }
                    router.push('/form-submitted/thank-you');
                }
                else {
                    setIsLoading(false);
                    setIsSuccess(false);
                    setError(true);
                    setNewSubmission(true);
                }
            })
            .catch(function (error) {
                console.log(error);
                setIsLoading(false);
                setIsSuccess(false);
                setError(true);
                setNewSubmission(true);
            });
    };

    // Get the filtered service options based on propertyType
    const getFilteredServiceOptions = () => {
        if (formData.propertyType && servicePropertyMap[formData.propertyType]) {
            return servicePropertyMap[formData.propertyType];
        }
        return [];
    };

    // Initialize Google Maps script
    const handleLoad = () => {
        setMapsLoaded(true);
    };
    // is address field 
    const isAddressField = (id) => {
        return ['address', 'pickUpAddress', 'dropOffAddress'].includes(id);
      };
      
      
    const formInputs = getQuoteFormData.map((field, index) => {
        if (field.id === 'service') {
            const filteredOptions = getFilteredServiceOptions();
            return (
                <Input
                    lightTheme={true}
                    key={index}
                    label={field.label}
                    type={field.type}
                    value={formData[field.id]}
                    onChange={(newValue) => handleChange(field.id, newValue, field.multiple)}
                    onBlur={field.required ? () => handleBlur(field.id, field.validation) : null}
                    required={field.required}
                    autoComplete={field.autoComplete}
                    isInvalid={errors[field.id]}
                    errorMessage={field.errorMessage}
                    options={filteredOptions}
                    multipleValue={field.multiple}
                />
            );
        } else if (isAddressField(field.id)) {
            return (
                    <React.Fragment key={field.id}>
                      { !mapsLoaded && <GoogleMapsLoader onLoad={handleLoad} /> }
                      { mapsLoaded && (
                        <GoogleAutocomplete
                          className="mt-16"
                          label={field.label}
                          value={formData[field.id]}  // pickUpAddress / dropOffAddress / address
                          onChange={(value) => handleChange(field.id, value, false)}
                          onSelect={(selectedAddress) => {
                            // When user selects an address from suggestions
                            setFormData((prevData) => ({
                              ...prevData,
                              [field.id]: selectedAddress
                            }));
                            // Reset errors if any
                            if (errors[field.id]) {
                              setErrors({ ...errors, [field.id]: false });
                            }
                          }}
                          required={field.required}
                          autoComplete={field.autoComplete}
                          error={errors[field.id]}
                          helperText={errors[field.id] ? 'Please enter a valid address' : ''}
                        />
                      )}
                    </React.Fragment>
            );
        } else {
            return (
                <Input
                    lightTheme={true}
                    key={index}
                    label={field.label}
                    type={field.type}
                    value={formData[field.id]}
                    onChange={field.type === 'chip' ?
                        (newValue) => handleChange(field.id, newValue, field.multiple) :
                        (e) => handleChange(field.id, e, field.multiple)}
                    onBlur={field.required ? () => handleBlur(field.id, field.validation) : null}
                    required={field.required}
                    autoComplete={field.autoComplete}
                    isInvalid={errors[field.id]}
                    errorMessage={field.errorMessage}
                    options={field.options}
                    multipleValue={field.multiple}
                    min={field.range && field.range.min}
                    max={field.range && field.range.max}
                    note={field.note && field.note}
                    id={field.id}
                />
            );
        }
    });

    return (
        <>
            <ContainerStyled variant="div" id="quote-form" className={`${className} py-8`} maxWidth="xl" >
                <Box sx={{ width: '100%' }} >
                    <React.Fragment>
                        <div className="input-wrapper">
                          {!hideTitle && 
                             <Typography variant="h4" component="h1" className="title">
                             {title}
                         </Typography>
                          }
                         
                            {formInputs}
                            <LoadingBtn newSubmission={newSubmission} onClick={submitHandler} isLoading={isLoading} isSuccess={isSuccess}>
                                Submit now
                            </LoadingBtn>
                            {error && <Alert sx={{ margin: "8px 0" }} severity='error'>Something went wrong. Please Try again</Alert>}
                        </div>
                    </React.Fragment>
                </Box>
            </ContainerStyled>
        </>
    );
}

const ContainerStyled = styled(Container)`
  padding: 0 !important; 
 
  .mobile-stepper{ 
    background: none; 
    padding:0;
    .MuiLinearProgress-root{ 
      width:100%;
      background: var(--light-primary-container); 
    }
  }
  .button-wrapper{ 
    display: flex;  
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap; 
    gap: 8px; 
  }
  svg.Mui-active{ 
    color: #F9F871; 
  }
  svg.Mui-completed{ 
    color: #F9F871; 
  }
  svg.Mui-active{ 
    text{ 
      fill: black; 
    }
  }
  @media(max-width: 500px){ 
    .stepper-wrapper{ 
      display: none ;
    }
  }

  .input-wrapper{ 
    background: var(--light--surface-container);
    border-radius: 12px; 
   
    .title { 
      margin: 8px 0; 
    }
    .Mui-error{ 
      font-size: 1rem;
    }
  }
  .quote-wrapper{ 
    background: var(--light--surface-container);
    border-radius: 12px; 
    max-width: 500px; 
    margin: 40px auto 0 auto;   
  
    .quote{ 
      max-width: 300px;
      margin: 16px auto; 
      padding: 16px 0; 
      border: dashed 2px var(--light-primary, #f9f871);
    }
  }
`;
