import React from 'react';
import {StyledButton} from "./styled";

export const Button = (
    {
        color,
        disabled,
        backgroundColor,
        fontSize,
        children,
        ...rest
    }
) => (
    <StyledButton
        color={color}
        backgroundColor={backgroundColor}
        disabled={disabled}
        fontSize={fontSize}
        {...rest}
    >
        {children}
    </StyledButton>
);