import styled from "styled-components";

const StyledProductSection = styled.section.attrs({
  className: "pb-10 leading-6",
})`
  & .instant-confirmation {
    text-align: center;
    margin: 26px 0;

    &::before {
      content: "";
      background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDE2IDI0Ij4KICA8cGF0aCBmaWxsPSIjRjU0RDBEIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNC44ODk5NTEyLDEwLjM3MzM1MDIgQzE1LjA5NTgyODYsMTAuMzczMzUwMiAxNS4yOTc2NDg1LDEwLjQyNzMwMDkgMTUuNDcyODQ4LDEwLjUyOTE3MDcgQzE1Ljk5NDQ4NTcsMTAuODMyNDc3MSAxNi4xNTYzODQ5LDExLjQ3Njc2OTggMTUuODM0NDU5OSwxMS45NjgyMzg1IEw4LjI3ODU3MjEsMjMuNTAzNDgxNSBDOC4wNzY0MTkzMiwyMy44MTIwOTkyIDcuNzE4OTgyNzUsMjQgNy4zMzQwNjM0NywyNCBDNi43MjEwODU4MiwyNCA2LjIyNDE2OTI2LDIzLjUzMTgyMjYgNi4yMjQxNjkyNiwyMi45NTQyOTY2IEw2LjIyNDE2OTI2LDEzLjYyNjY0OTggTDEuMTEwMDQ4NzYsMTMuNjI2NjQ5OCBDMC45MDQxNzE0MzksMTMuNjI2NjQ5OCAwLjcwMjM1MTUwMiwxMy41NzI2OTkxIDAuNTI3MTUyMDA3LDEzLjQ3MDgyOTMgQzAuMDA1NTE0Mjk2OTQsMTMuMTY3NTIyOSAtMC4xNTYzODQ4NTQsMTIuNTIzMjMwMiAwLjE2NTU0MDEzMywxMi4wMzE3NjE1IEw3LjcyMTQyNzksMC40OTY1MTg1NDggQzcuOTIzNTgwNjgsMC4xODc5MDA3NjEgOC4yODEwMTcyNSwwIDguNjY1OTM2NTMsMCBDOS4yNzg5MTQxOCwwIDkuNzc1ODMwNzQsMC40NjgxNzczODEgOS43NzU4MzA3NCwxLjA0NTcwMzQ1IEw5Ljc3NTgzMDc0LDEwLjM3MzM1MDIgTDE0Ljg4OTk1MTIsMTAuMzczMzUwMiBaIi8+Cjwvc3ZnPgo=")
        no-repeat center/contain;
      width: 24px;
      height: 24px;
      display: inline-block;
      vertical-align: middle;
      margin: -2px 5px 0 0.5rem;
    }
  }

  & .extra-buttons {
    display: flex;
    flex-wrap: wrap;
    margin: 20px 0;
    gap: 20px;
    justify-content: center;
    align-items: center;

    & .extra-button {
      width: max-content;
      background: white;
      padding: 0;
      font-weight: 400;
      border: none;
      color: var(--bs-black);
      text-decoration: underline;

      &:hover,
      &:active,
      &:focus {
        background: white;
        border: none;
        color: var(--primary);
      }

      svg {
        width: 16px;
        margin-right: 5px;
      }

      /* @media screen and (max-width: 1200px) {
        width: 100%;
        margin: 10px;
      }

      @media screen and (max-width: 992px) {
        width: 200px;
        margin: 0;
      } */
    }
  }

  /* iframe {
    @media screen and (max-width: 1200px) {
      height: 300px;
    }
  } */

  /* @media screen and (max-width: 768px) {
    & > :global(.container) {
      width: 100%;
      max-width: 100%;
      padding: 0;

      & > :global(.row) {
        width: 100%;
        margin: 0;

        & > :global(.col-sm-12) {
          padding: 0;
        }
      }
    }
  }*/

  & .popup-button {
    position: fixed;
    bottom: 0;
    z-index: 100;
  }
`;

export default StyledProductSection;
