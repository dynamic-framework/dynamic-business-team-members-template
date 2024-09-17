import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Column,
  useSortBy,
  useTable,
} from 'react-table';

import { User } from '../../services';
import useUsersEffect from '../../services/hooks/useUsersEffect';
import UsersLoader from '../loaders/UsersLoader';

import TablePaymentDetailHeader from './TableUsersHeader';
import TablePaymentDetailRow from './TableUsersRow';

export default function TableUsers() {
  const { loading, users } = useUsersEffect();
  const { t } = useTranslation();

  const columns = useMemo<Column<User>[]>(() => [
    { Header: t('table.name'), accessor: 'name' },
    { Header: t('table.role'), accessor: 'role' },
    { Header: t('table.id'), accessor: 'identification' },
    { Header: t('table.lastLogin'), accessor: 'lastSession' },
    { Header: t('table.status'), accessor: 'status' },
  ], [t]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data: users,
    },
    useSortBy,
  );

  if (loading) {
    return <UsersLoader />;
  }

  return (
    <div className="overflow-auto">
      <table
        {...getTableProps()}
        className="w-100"
      >
        <TablePaymentDetailHeader
          headerGroups={headerGroups}
        />
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <TablePaymentDetailRow
                key={row.id}
                row={row}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
