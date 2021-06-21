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
  ImageInput,
  ImageField,
  BooleanInput,
  NumberInput,
} from 'react-admin';
import BookIcon from '@material-ui/icons/Book';
import jsonExport from 'jsonexport/dist';
export const ProductIcon = BookIcon;

const productExporter = (products) => {
  const productsForExport = products.map((product) => {
    const { _id, __v, ...productForExport } = product; // omit backlinks and author
    // postForExport.author_name = post.author.name; // add a field
    return productForExport;
  });
  jsonExport(
    productsForExport,
    {
      headers: [
        'id',
        'name',
        'description',
        'price',
        'category',
        'quantity',
        'shipping',
        'createdAt',
        'updatedAt',
        'Sold',
      ], // order fields in the export
    },
    (err, csv) => {
      downloadCSV(csv, 'productList'); // download as 'posts.csv` file
    }
  );
};

export const ProductList = (props) => (
  <List {...props} exporter={productExporter}>
    <Datagrid>
      <TextField source='id' />
      <TextField source='name' />
      <ImageField source='photo.data' title='Image' />
      <TextField source='description' />
      <TextField label='Collection' source='collections.name' />
      <TextField label='Category' source='category.name' />
      <TextField label='SubCategory' source='subcategory.name' />
      <TextField label='Cases' source='cases.name' />
      <TextField label='Model' source='model.name' />
      <TextField source='price' />
      <TextField source='quantity' />
      <TextField source='shipping' />
      <DateField source='createdAt' />
      <DateField source='updatedAt' />
      <TextField source='sold' />
      <EditButton basePath='/products' />
      <DeleteButton basePath='/products' />
    </Datagrid>
  </List>
);

// const ProductTitle = ({ products }) => {
//   return <span>Product {products ? `"${products.name}"` : ''}</span>;
// };

export const ProductEdit = (props) => (
  <Edit title='Edit Product' undoable={false} {...props}>
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
      <TextInput source='description' />
      <TextInput source='price' />
      <TextInput source='quantity' />
      <ReferenceInput label='Category' source='category' reference='categories'>
        <SelectInput optionText='name' />
      </ReferenceInput>
      <ReferenceInput
        label='SubCategory'
        source='subcategory'
        reference='subcategory'>
        <SelectInput optionText='name' />
      </ReferenceInput>
      <ReferenceInput label='Cases' source='cases' reference='cases'>
        <SelectInput optionText='name' />
      </ReferenceInput>
      <ReferenceInput label='Models ' source='model' reference='phonemodel'>
        <SelectInput optionText='name' />
      </ReferenceInput>
      <ReferenceInput
        label='Collections '
        source='collections'
        reference='collections'>
        <SelectInput optionText='name' />
      </ReferenceInput>
      <BooleanInput source='shipping' />
      <NumberInput source='sold' />
    </SimpleForm>
  </Edit>
);

export const ProductCreate = (props) => {
  const notify = useNotify();
  const refresh = useRefresh();
  const redirect = useRedirect();

  const onSuccess = ({ data }) => {
    notify(`Created Product "${data.title}" saved`);
    redirect('/products');
    refresh();
  };

  return (
    <Create onSuccess={onSuccess} title='Create Product' {...props}>
      <SimpleForm>
        <TextInput source='name' />
        <ImageInput
          source='photo'
          label='Related pictures'
          accept='image/*'
          placeholder={<p>Drop your file here</p>}>
          <ImageField source='photo' title='title' />
        </ImageInput>
        <TextInput multiline source='description' />
        <TextInput source='price' />
        <TextInput source='quantity' />
        <ReferenceInput
          label='Category'
          source='category'
          reference='categories'>
          <SelectInput optionText='name' />
        </ReferenceInput>
        <ReferenceInput
          label='SubCategory'
          source='subcategory'
          reference='subcategory'>
          <SelectInput optionText='name' />
        </ReferenceInput>
        <ReferenceInput label='Cases' source='cases' reference='cases'>
          <SelectInput optionText='name' />
        </ReferenceInput>
        <ReferenceInput label='Model' source='model' reference='phonemodel'>
          <SelectInput optionText='name' />
        </ReferenceInput>
        <ReferenceInput
          label='Collection'
          source='collections'
          reference='collections'>
          <SelectInput optionText='name' />
        </ReferenceInput>
        <BooleanInput source='shipping' />
        <NumberInput source='sold' />
      </SimpleForm>
    </Create>
  );
};
