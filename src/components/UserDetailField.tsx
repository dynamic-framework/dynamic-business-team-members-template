import classNames from 'classnames';
import { Trans } from 'react-i18next';

type Props = {
  i18nKey: string;
  value?: string | number;
  className?: string;
};

export default function UserDetailField({
  i18nKey,
  value,
  className,
}: Props) {
  return (
    <p
      className={classNames(
        'd-flex align-items-center gap-2',
        className,
      )}
    >
      <Trans
        i18nKey={i18nKey}
        values={{ value }}
        components={{
          bold: <strong />,
          span: <span />,
        }}
      />
    </p>
  );
}
