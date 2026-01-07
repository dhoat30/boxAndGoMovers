import styled from "@emotion/styled";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { theme } from "@/utils/themeSettings";
import { ThemeProvider } from "@mui/material/styles";
export default function RegularProcess({ title, description, cards }) {
  if (!cards) return null;

  const stepCards = cards.map((item, index) => {
    return (
      <div className="step-wrapper" key={index}>
        <div className="title">
          <div className="step-title-number-wrapper">
            <div className="step-number">{index + 1}</div>
            <Typography
              variant="h6"
              component="h3"
              color="var(--dark-on-secondary-container)"
            >
              {item.title}
            </Typography>
          </div>
          <div className="border"></div>
        </div>
        <div className="content">
          <Typography
            variant="body1"
            component="div"
            className="description"
            dangerouslySetInnerHTML={{ __html: item.description }}
          ></Typography>
        </div>
      </div>
    );
  });
  
  return (
    <ThemeProvider theme={theme}>
      <Section>
        <Container maxWidth="lg" className="container">
          <div className="title-wrapper">
            <Typography variant="h3" component="h2" className="title">
              {title}
            </Typography>
            <div
              className="description body1"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>

          <div className="steps-wrapper">{stepCards}</div>
        </Container>
      </Section>
    </ThemeProvider>
  );
}
const Section = styled.section`
  padding: 40px 0;
  overflow: hidden !important;
  background: var(--light-secondary-container);
  .title-wrapper {
    display: grid;
    grid-template-columns: auto 600px;
    gap: 40px;
    @media (max-width: 1000px) {
      grid-template-columns: 1fr;
      gap: 0;
    }
    .title{ 
      font-size: 2rem; 
    }
    .description {
      font-size: 1.4rem !important;
      color: var(--dark-on-surface-variant);
      p,
      strong {
        font-size: 1.2rem !important;
        color: var(--dark-on-surface-variant);
      }
      @media (max-width: 900px) {
        font-size: 1rem !important;
        p {
          font-size: 1rem !important;
        }
      }
    }
  }
  .steps-wrapper {
    .step-wrapper {
      margin: 80px 0;
      display: grid;
      gap: 40px;
      grid-template-columns: auto 600px;
      @media (max-width: 1000px) {
        grid-template-columns: 1fr;
        gap: 16px;
        margin: 24px 0;
      }
      align-items: end;
      .title {
        .step-title-number-wrapper {
          display: grid;
          grid-template-columns: 40px auto;
          align-items: center;
          gap: 16px;
          h3{ 
              color: var(--dark-on-surface-variant);
            }
          .step-number {
            background: var(--dark-on-surface);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            font-weight: 700;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            color: var(--dark-on-secondary-container);
          }
        }
      }
      .border {
        margin-top: 24px;
        border-top: 2px solid var(--dark-secondary-container);
        height: 1px;
        @media (max-width: 600px) {
          margin-top: 16px;
        }
      }
    }
    .content {
      color: var(--white);
      .description {
        p {
          color: var(--dark-on-surface-variant);
          font-size: 1rem;
          font-weight: 400 !important;
          line-height: 1.5rem;
          margin-top: 8px;
          margin-bottom: 8px;
        }
        li {
          margin-top: 4px;
        }
      }
    }
    h2 {
    }
  }
`;
