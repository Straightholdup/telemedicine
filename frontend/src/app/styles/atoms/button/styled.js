import styled from "styled-components";

export const StyledButton = styled.button`
  ${({
       fontSize,
       color,
       button,
       backgroundColor,
       disabled,
     }) => `
        color: ${color || "#FFFF"};
        border-radius: 10px;
        background-color: ${backgroundColor || "#0082B3"};
        font-family: 'Montserrat', sans-serif;
        fontSize: ${fontSize || '18px'}
        cursor: pointer;
        transition: all 0.2s linear;
        outline: 0;
        border: 0;
        padding: 8px 16px;
        mix-blend-mode: normal;
        ${disabled ? `
            opacity: 0.48;
        ` : ''}
        ${button === 'success' ? `
            background-color: ${backgroundColor || "#21A038"};
            color: ${color || "#FFFFFFF"};
        ` : ''}
    `}
`;