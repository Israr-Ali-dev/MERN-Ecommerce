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
  ImageInput,
  ImageField,
} from 'react-admin';
import BookIcon from '@material-ui/icons/Book';
import jsonExport from 'jsonexport/dist';
export const CasesIcon = BookIcon;

const casesExporter = (cases) => {
  const casesForExport = cases.map((casel) => {
    // const { _id, __v, updatedAt } = casel; // omit backlinks and author
    // postForExport.author_name = post.author.name; // add a field
    return casesForExport;
  });
  jsonExport(
    casesForExport,
    {
      headers: ['id', 'name', 'createdAt'], // order fields in the export
    },
    (err, csv) => {
      downloadCSV(csv, 'CasesList'); // download as 'posts.csv` file
    }
  );
};

export const CasesList = (props) => (
  <List {...props} exporter={casesExporter}>
    <Datagrid>
      <TextField source='id' />
      <TextField source='name' />
      <ImageField source='photo.data' title='Image' />
      <DateField source='createdAt' />
      <EditButton basePath='/cases' />
      <DeleteButton basePath='/cases' />
    </Datagrid>
  </List>
);

export const CasesEdit = (props) => (
  <Edit title='Edit Cases' undoable={false} {...props}>
    <SimpleForm>
      <TextInput disabled source='id' />
      <TextInput source='name' />
      <ImageInput
        source='photo'
        label='Related pictures'
        accept='image/*'
        placeholder={<p>Drop your file here</p>}>
        <ImageField source='photo.data' title='title' />
      </ImageInput>
      <ImageField source='photo.data' title='title' />
    </SimpleForm>
  </Edit>
);

export const CasesCreate = (props) => {
  const notify = useNotify();
  const refresh = useRefresh();
  const redirect = useRedirect();

  const onSuccess = ({ data }) => {
    notify(`Cases Category "${data.title}" saved`);
    redirect('/cases');
    refresh();
  };

  return (
    <Create onSuccess={onSuccess} title='Create Cases' {...props}>
      <SimpleForm>
        <TextInput source='name' />
        <ImageInput
          source='photo'
          label='Related pictures'
          accept='image/*'
          placeholder={<p>Drop your file here</p>}>
          <ImageField source='photo' title='title' />
        </ImageInput>
      </SimpleForm>
    </Create>
  );
};
