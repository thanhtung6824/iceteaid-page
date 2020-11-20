import React from 'react';
import { useRecoilState } from 'recoil';
import { OneLineButton } from '../StyledUtils';
import { ButtonPro, DeepButton } from '../Button';
import { dialogAtom } from '../../../recoil/atom';
import { useDarkMode } from '../../../hooks';
import CommonDialog from './CommonDialog';
import { Title, Subtitle, DialogContent } from './styled/CommonDialog.styled';

interface Props {
    title: string;
    subTitle?: string;
    cancel: () => void;
    confirm: () => void;
    confirmText: string;
    cancelText?: string;
}

const ConfirmDialog: React.FC<Props> = ({
    cancel,
    confirm,
    cancelText = 'Cancel',
    confirmText,
    title,
    subTitle,
}: Props) => {
    const [open, setOpen] = useRecoilState(dialogAtom('dialog/confirm'));
    const darkMode = useDarkMode();

    return (
        <CommonDialog open={open} setOpen={setOpen}>
            <DialogContent>
                <Title>{title}</Title>
                <Subtitle>{subTitle}</Subtitle>
                <OneLineButton>
                    <ButtonPro customprops={{ backgroundColorHover: '#B08BFF' }} onClick={cancel} fullWidth>
                        {cancelText}
                    </ButtonPro>
                    <DeepButton darkMode={darkMode.value} onClick={confirm} fullWidth>
                        {confirmText}
                    </DeepButton>
                </OneLineButton>
            </DialogContent>
        </CommonDialog>
    );
};

export default ConfirmDialog;
