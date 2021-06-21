import React from 'react';
import {
  List,
  Datagrid,
  DatagridBody,
  Edit,
  SimpleForm,
  DateField,
  TextField,
  EditButton,
  TextInput,
  DeleteButton,
  SelectInput,
  ArrayField,
} from 'react-admin';
import BookIcon from '@material-ui/icons/Book';
// import jsonExport from 'jsonexport/dist';
// import moment from 'moment';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
// import { getStatusValues } from '../user/apiCore';
import { API } from '../../config';
import { isAuthenticated } from '../../auth/index';
export const OrderIcon = BookIcon;

// const orderExporter = (order) => {
//   const orderForExport = order.map((col) => {
//     const { _id, __v, updatedAt } = col; // omit backlinks and author
//     // postForExport.author_name = post.author.name; // add a field
//     return orderForExport;
//   });
//   jsonExport(
//     orderForExport,
//     {
//       headers: ['id', 'name', 'createdAt'], // order fields in the export
//     },
//     (err, csv) => {
//       downloadCSV(csv, 'OrderList'); // download as 'posts.csv` file
//     }
//   );
// };

// const MyDatagridRow = ({
//   record,
//   resource,
//   id,
//   onToggleItem,
//   children,
//   selected,
//   basePath,
// }) => (
//   <TableRow key={id}>
//     {/* first column: selection checkbox */}
//     <TableCell padding='none'>
//       <Checkbox
//         disabled={record.selectable}
//         checked={selected}
//         onClick={() => onToggleItem(id)}
//       />
//     </TableCell>
//     {/* data columns based on children */}
//     {React.Children.map(children, (field) => (
//       <TableCell key={`${id}-${field.props.source}`}>
//         {React.cloneElement(field, {
//           record,
//           basePath,
//           resource,
//         })}
//         <TableCell key={`${id}-${field.props.source}`}>
//           {resource.status}
//         </TableCell>
//       </TableCell>
//     ))}
//   </TableRow>
// );

// const MyDatagridBody = (props) => (
//   <DatagridBody {...props} row={<MyDatagridRow />} />
// );
// const MyDatagrid = (props) => <Datagrid {...props} body={<MyDatagridBody />} />;

// const CustomDatagridRow = ({
//   record,
//   resource,
//   id,
//   onToggleItem,
//   children,
//   selected,
//   basePath,
// }) =>
//   record.isSpecial ? (
//     <TableRow key={id}>
//       <Checkbox checked={selected} onClick={() => onToggleItem(id)} />
//       <TableCell key={`${id}-date`}>
//         <DateField
//           source='date'
//           record={record}
//           basePath={basePath}
//           resource={resource}
//         />
//       </TableCell>
//       <TableCell key={`${id}-text`}>
//         <TextField
//           source='text'
//           record={record}
//           basePath={basePath}
//           resource={resource}
//         />
//       </TableCell>
//     </TableRow>
//   ) : (
//     <TableRow key={id}>
//       <Checkbox checked={selected} onClick={() => onToggleItem(id)} />
//       <TableCell key={`${id}-date`}>
//         <DateField
//           source='date'
//           record={record}
//           basePath={basePath}
//           resource={resource}
//         />
//       </TableCell>
//       <TableCell key={`${id}-reference`}>
//         <TextField
//           source='reference'
//           record={record}
//           basePath={basePath}
//           resource={resource}
//         />
//       </TableCell>
//       <TableCell key={`${id}-author`}>
//         <TextField
//           source='author'
//           record={record}
//           basePath={basePath}
//           resource={resource}
//         />
//       </TableCell>
//     </TableRow>
//   );
// const CustomDatagridBody = (props) => (
//   <DatagridBody {...props} row={<CustomDatagridRow />} />
// );
// const CustomDatagrid = (props) => (
//   <Datagrid {...props} body={<CustomDatagridBody />} />
// );

// Geting Login User Id for authentication.
const userId = () => {
  if (localStorage.getItem('jwt')) {
    const {
      data: {
        user: { _id },
      },
    } = isAuthenticated();

    return _id;
  } else {
    return false;
  }
};

// Geting Login User Id for authentication.
const userToken = () => {
  if (localStorage.getItem('jwt')) {
    const {
      data: { token },
    } = isAuthenticated();

    return token;
  } else {
    return false;
  }
};

export const OrderList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source='id' />
      <TextField label='Amount ($)' source='amount' />
      <TextField label='Transaction ID' source='transaction_id' />
      <TextField source='status' />
      <ArrayField source='products'>
        <Datagrid>
          <TextField source='name' />
          <TextField source='price' />
          <TextField source='count' />
        </Datagrid>
      </ArrayField>

      <TextField source='address' />
      <TextField source='createdAt' />
      <EditButton basePath='/order' />
      <DeleteButton basePath='/order' />
    </Datagrid>
  </List>
);
if (userId()) {
  const getStatusValues = () => {
    return fetch(`${API}/order/status-values/${userId()}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${userToken()}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

  var statusArray;
  getStatusValues().then((data) => {
    if (!data) {
      // console.log(data.error);
    } else {
      statusArray = data;
    }
  });
  console.log(statusArray);
  if (Array.isArray(statusArray)) {
    var list;
    setTimeout(() => {
      list = statusArray.map((p) => {
        return { id: `${p}`, name: `${p}` };
      });
    }, 1000);
  }
}
export const OrderEdit = (props) => (
  <Edit title='Edit Order' undoable={false} {...props}>
    <SimpleForm>
      <TextInput disabled source='id' />
      <SelectInput source='status' choices={list} />
    </SimpleForm>
  </Edit>
);

// export const CollectionCreate = (props) => {
//   const notify = useNotify();
//   const refresh = useRefresh();
//   const redirect = useRedirect();

//   const onSuccess = ({ data }) => {
//     notify(`Created Collection "${data.title}" saved`);
//     redirect('/collections');
//     refresh();
//   };

//   return (
//     <Create onSuccess={onSuccess} title='Create Collection' {...props}>
//       <SimpleForm>
//         <TextInput source='name' />
//       </SimpleForm>
//     </Create>
//   );
// };
