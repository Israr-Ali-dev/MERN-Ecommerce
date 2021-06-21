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
  ReferenceInput,
  SelectInput,
  useNotify,
  useRefresh,
  useRedirect,
} from 'react-admin';
import BookIcon from '@material-ui/icons/Book';
import jsonExport from 'jsonexport/dist';
export const subCategoryIcon = BookIcon;

const subCategoryExporter = (subcategories) => {
  const subCategoryForExport = subcategories.map((subcategory) => {
    // const { _id, __v, updatedAt } = subcategory; // omit backlinks and author
    // postForExport.author_name = post.author.name; // add a field
    return subCategoryForExport;
  });
  jsonExport(
    subCategoryForExport,
    {
      headers: ['id', 'name', 'createdAt'], // order fields in the export
    },
    (err, csv) => {
      downloadCSV(csv, 'SubCategoryList'); // download as 'posts.csv` file
    }
  );
};

export const subCategoryList = (props) => (
  <List {...props} exporter={subCategoryExporter}>
    <Datagrid>
      <TextField source='id' />
      <TextField source='name' />
      <TextField label='Category' source='category.name' />
      <DateField source='createdAt' />
      <EditButton basePath='/subcategory' />
      <DeleteButton basePath='/subcategory' />
    </Datagrid>
  </List>
);

export const subCategoryEdit = (props) => (
  <Edit title='Edit Sub Category' undoable={false} {...props}>
    <SimpleForm>
      <TextInput disabled source='id' />
      <TextInput source='name' />
      <ReferenceInput label='Category' source='category' reference='categories'>
        <SelectInput optionText='name' />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

export const SubCategoryCreate = (props) => {
  const notify = useNotify();
  const refresh = useRefresh();
  const redirect = useRedirect();

  const onSuccess = ({ data }) => {
    notify(`Created Sub Category "${data.title}" saved`);
    redirect('/subcategory');
    refresh();
  };

  return (
    <Create onSuccess={onSuccess} title='Create Sub Category' {...props}>
      <SimpleForm>
        <TextInput source='name' />
        <ReferenceInput
          label='Category'
          source='category'
          reference='categories'>
          <SelectInput optionText='name' />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
};
