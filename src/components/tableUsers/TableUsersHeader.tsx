/* eslint-disable react/jsx-key */
import { DIcon } from '@dynamic-framework/ui-react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { HeaderGroup } from 'react-table';

import { User } from '../../services';

interface Props {
  headerGroups: Array<HeaderGroup<User>>;
}

export default function TableUsersHeader({ headerGroups }: Props) {
  const { t } = useTranslation();
  const renderSort = useCallback((column: HeaderGroup<User>) => {
    if (column.isSorted) {
      if (column.isSortedDesc) {
        return (
          <DIcon
            icon="chevron-bar-down"
            size="1rem"
            theme="secondary"
          />
        );
      }
      return (
        <DIcon
          icon="chevron-bar-up"
          size="1rem"
          theme="secondary"
        />
      );
    }
    return (
      <DIcon
        icon="chevron-expand"
        size="1rem"
        theme="secondary"
      />
    );
  }, []);

  return (
    <thead>
      {headerGroups.map((headerGroup) => (
        <tr
          {...headerGroup.getHeaderGroupProps()}
          className="bg-gray-100 border-bottom border-gray-200"
        >
          {headerGroup.headers.map((column) => (
            <th
              className="p-3"
              {...(column.id === 'email')
                ? { ...column.getHeaderProps() }
                : { ...column.getHeaderProps(column.getSortByToggleProps()) }}
            >
              <div className="d-flex justify-content-between">
                <small className="fw-normal flex-grow-1">
                  {column.render('Header')}
                </small>
                <span className="text-gray-500">
                  {renderSort(column)}
                </span>
              </div>
            </th>
          ))}
          <th className="p-3" role="columnheader">
            <small className="d-block fw-normal text-center">
              {t('table.actions')}
            </small>
          </th>
        </tr>
      ))}
    </thead>
  );
}
