import * as React from 'react';
import {
  List,
  Datagrid,
  Edit,
  Create,
  SimpleForm,
  DateField,
  TextField,
  EditButton,
  TextInput,
  downloadCSV,
  DeleteButton,
  useNotify,
  useRefresh,
  useRedirect,
} from 'react-admin';
import BookIcon from '@material-ui/icons/Book';
import jsonExport from 'jsonexport/dist';
export const CollectionIcon = BookIcon;

const collectionExporter = (collection) => {
  const collectionForExport = collection.map((col) => {
    // const { _id, __v, updatedAt } = col; // omit backlinks and author
    // postForExport.author_name = post.author.name; // add a field
    return collectionForExport;
  });
  jsonExport(
    collectionForExport,
    {
      headers: ['id', 'name', 'createdAt'], // order fields in the export
    },
    (err, csv) => {
      downloadCSV(csv, 'CollectionList'); // download as 'posts.csv` file
    }
  );
};

export const CollectionList = (props) => (
  <List {...props} exporter={collectionExporter}>
    <Datagrid>
      <TextField source='id' />
      <TextField source='name' />
      <DateField source='createdAt' />
      <EditButton basePath='/collections' />
      <DeleteButton basePath='/collections' />
    </Datagrid>
  </List>
);

export const CollectionEdit = (props) => (
  <Edit title='Edit Collection' undoable={false} {...props}>
    <SimpleForm>
      <TextInput disabled source='id' />
      <TextInput source='name' />
    </SimpleForm>
  </Edit>
);

export const CollectionCreate = (props) => {
  const notify = useNotify();
  const refresh = useRefresh();
  const redirect = useRedirect();

  const onSuccess = ({ data }) => {
    notify(`Created Collection "${data.title}" saved`);
    redirect('/collections');
    refresh();
  };

  return (
    <Create onSuccess={onSuccess} title='Create Collection' {...props}>
      <SimpleForm>
        <TextInput source='name' />
      </SimpleForm>
    </Create>
  );
};
