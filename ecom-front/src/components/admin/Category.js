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
  BooleanInput,
} from 'react-admin';
import BookIcon from '@material-ui/icons/Book';
import jsonExport from 'jsonexport/dist';
export const CategoryIcon = BookIcon;

const categoryExporter = (categories) => {
  const categoryForExport = categories.map((category) => {
    // const { _id, __v, updatedAt } = category; // omit backlinks and author
    // postForExport.author_name = post.author.name; // add a field
    return categoryForExport;
  });
  jsonExport(
    categoryForExport,
    {
      headers: ['id', 'name', 'createdAt'], // order fields in the export
    },
    (err, csv) => {
      downloadCSV(csv, 'CategoryList'); // download as 'posts.csv` file
    }
  );
};

export const CategoryList = (props) => (
  <List {...props} exporter={categoryExporter}>
    <Datagrid>
      <TextField source='id' />
      <TextField source='name' />
      <TextField source='subcategory' />
      <DateField source='createdAt' />
      <EditButton basePath='/categories' />
      <DeleteButton basePath='/categories' />
    </Datagrid>
  </List>
);

export const CategoryEdit = (props) => (
  <Edit title='Edit Category' undoable={false} {...props}>
    <SimpleForm>
      <TextInput disabled source='id' />
      <TextInput source='name' />
      <BooleanInput source='subcategory' />
    </SimpleForm>
  </Edit>
);

export const CategoryCreate = (props) => {
  const notify = useNotify();
  const refresh = useRefresh();
  const redirect = useRedirect();

  const onSuccess = ({ data }) => {
    notify(`Created Category "${data.title}" saved`);
    redirect('/categories');
    refresh();
  };

  return (
    <Create onSuccess={onSuccess} title='Create Category' {...props}>
      <SimpleForm>
        <TextInput source='name' />
        <BooleanInput source='subcategory' />
      </SimpleForm>
    </Create>
  );
};
