import { component$, HTMLAttributes, Slot, useStyles$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './button-icon.scss?inline'

export type ButtonIconProps = {
    color ? : string
} & HTMLAttributes<HTMLButtonElement>

export const ButtonIcon = component$<ButtonIconProps>(({color = 'primary',  ...props }) => {
    useStylesScoped$(styles)
    return (
        <>
            <button class={`btn btn-${color}`} {...props}>
                <Slot />
            </button>
        </>
    );
});