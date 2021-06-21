import * as React from 'react';
// import { customProvider } from './dataProviders';
import { Admin, Resource } from 'react-admin';
import imageUploadProvider from './imageUploadProvider';
import authProvider from './authProvider';
// import MyLoginPage from './MyLoginPage';
import Dashboard from './Dashboard';

import {
  ProductList,
  ProductEdit,
  ProductCreate,
  ProductIcon,
} from './Product';

import {
  CategoryList,
  CategoryEdit,
  CategoryCreate,
  CategoryIcon,
} from './Category';

import {
  phoneModelList,
  phoneModelEdit,
  PhoneModelCreate,
  phoneModelIcon,
} from './phoneModel';

import {
  subCategoryList,
  subCategoryEdit,
  SubCategoryCreate,
  subCategoryIcon,
} from './subCategory';

import {
  CollectionList,
  CollectionEdit,
  CollectionCreate,
  CollectionIcon,
} from './Collection';

import { OrderList, OrderEdit, OrderIcon } from './Order';

import { CasesList, CasesEdit, CasesCreate, CasesIcon } from './Cases';

const AdminDashboard = () => (
  <Admin
    dashboard={Dashboard}
    // loginPage={MyLoginPage}
    authProvider={authProvider}
    dataProvider={imageUploadProvider}>
    <Resource
      name='products'
      list={ProductList}
      edit={ProductEdit}
      create={ProductCreate}
      icon={ProductIcon}
    />
    <Resource
      name='categories'
      list={CategoryList}
      edit={CategoryEdit}
      create={CategoryCreate}
      icon={CategoryIcon}
    />

    <Resource
      name='cases'
      list={CasesList}
      edit={CasesEdit}
      create={CasesCreate}
      icon={CasesIcon}
    />

    <Resource
      name='phonemodel'
      list={phoneModelList}
      edit={phoneModelEdit}
      create={PhoneModelCreate}
      icon={phoneModelIcon}
    />

    <Resource
      name='subcategory'
      list={subCategoryList}
      edit={subCategoryEdit}
      create={SubCategoryCreate}
      icon={subCategoryIcon}
    />

    <Resource
      name='collections'
      list={CollectionList}
      edit={CollectionEdit}
      create={CollectionCreate}
      icon={CollectionIcon}
    />

    <Resource name='order' list={OrderList} edit={OrderEdit} icon={OrderIcon} />
  </Admin>
);

export default AdminDashboard;
