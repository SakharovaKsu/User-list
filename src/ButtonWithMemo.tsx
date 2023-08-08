import React, {FC, memo} from 'react';
import Button from '@mui/material/Button';

type ButtonWithMemoType = {
    title: string
    variant: 'text' | 'outlined' | 'contained'
    color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
    onClick: () => void
}

export const ButtonWithMemo: FC<ButtonWithMemoType> = memo(({title,
                                                        variant,
                                                        color,
                                                        onClick
}) => {
        return (
            <Button variant={variant}
                    color={color}
                    onClick={onClick}
            >{title}</Button>
        )
    }
)