import styled from "styled-components";

export const Wrapper = styled.div`
  width: 1400px;
  margin: auto;

  @media only screen and (max-width: 768px) {
    width: 100%;
    height: 100%;

    button {
      margin: 5px;
    }

    div.text-center.col-2 {
      width: 30%;
    }

    #search-container {
      width: 100%;
      div.col-2 {
        width: 40%;
        margin: 0;
      }

      input.form-control {
        width: 60%;
        margin-bottom: 10px;
      }

      div.input-group select {
        width: 60%;
      }

      div.col-1 {
        width: 40%;
        margin-left: 48%;
      }
    }

    #networkForm {
      div.col-2 {
        width: 30%;
      }

      div.col-4 {
        width: 35%;
      }

      div.col-1 {
        width: 21%;
        padding: 0px;
        margin: 0px;
      }

      div.col-1 button {
        margin: 0;
      }

      div.justify-content-center {
      }
    }
  }
`;
