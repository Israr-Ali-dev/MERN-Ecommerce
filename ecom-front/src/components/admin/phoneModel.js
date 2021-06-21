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
export const phoneModelIcon = BookIcon;

const phoneModelExporter = (phoneModel) => {
  const phoneModelForExport = phoneModel.map((phonemodel) => {
    // const { _id, __v, updatedAt } = phonemodel; // omit backlinks and author
    // postForExport.author_name = post.author.name; // add a field
    return phoneModelForExport;
  });
  jsonExport(
    phoneModelForExport,
    {
      headers: ['id', 'name', 'createdAt'], // order fields in the export
    },
    (err, csv) => {
      downloadCSV(csv, 'phoneModelList'); // download as 'posts.csv` file
    }
  );
};

export const phoneModelList = (props) => (
  <List {...props} exporter={phoneModelExporter}>
    <Datagrid>
      <TextField source='id' />
      <TextField source='name' />
      <ImageField source='photo.data' title='Image' />
      <DateField source='createdAt' />
      <EditButton basePath='/phonemodel' />
      <DeleteButton basePath='/phonemodel' />
    </Datagrid>
  </List>
);

export const phoneModelEdit = (props) => (
  <Edit title='Phone Model Cases' undoable={false} {...props}>
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

export const PhoneModelCreate = (props) => {
  const notify = useNotify();
  const refresh = useRefresh();
  const redirect = useRedirect();

  const onSuccess = ({ data }) => {
    notify(`Phone Model Category "${data.title}" saved`);
    redirect('/phonemodel');
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
