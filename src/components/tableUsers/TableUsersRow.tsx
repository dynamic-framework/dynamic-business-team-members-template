/* eslint-disable react/jsx-key */
import { DChip } from '@dynamic-framework/ui-react';
import { USER_STATUS_COLOR } from '@modyo-dynamic/modyo-service-business';
import type { User, UserStatusColor } from '@modyo-dynamic/modyo-service-business';
import { useCallback } from 'react';
import { Cell, Row } from 'react-table';

import useWidgetUtils from '../../hooks/useWidgetUtils';

import TableUsersActions from './TableUsersActions';
import TableUsersRoleDetail from './TableUsersRoleDetail';

interface Props {
  row: Row<User>;
}

export default function TableUsersRow({ row }: Props) {
  const { formatDate } = useWidgetUtils();
  const renderCell = useCallback((cell: Cell<User>) => {
    switch (cell.column.id) {
      case 'name':
        return (
          <small>
            {cell.value}
          </small>
        );

      case 'identification':
        return (
          <small className="text-gray-700">
            {cell.row.original.identification.number}
          </small>
        );

      case 'role':
        return (
          <TableUsersRoleDetail
            name={cell.row.original.role.name}
            role={cell.row.original.role.role}
          />
        );

      case 'status':
        return (
          <DChip
            text={cell.row.original.status?.label}
            theme={USER_STATUS_COLOR[cell.row.original.status?.status as UserStatusColor]}
          />
        );

      case 'lastSession':
        return (
          <small className="text-gray-700">
            {formatDate(cell.value as string)}
          </small>
        );

      default:
        return (
          <small className="text-gray-700">
            {cell.render('Cell')}
          </small>
        );
    }
  }, [formatDate]);

  return (
    <tr
      className="border-bottom border-gray-200"
      {...row.getRowProps()}
    >
      {row.cells.map((cell) => {
        const rendered = renderCell(cell);
        return (
          <td
            className="p-3"
            {...cell.getCellProps()}
          >
            {rendered}
          </td>
        );
      })}
      <td className="p-3">
        <TableUsersActions user={row.original} />
      </td>
    </tr>
  );
}
