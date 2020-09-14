import React from 'react';
import { CategoryContext } from '../components/layout/Dashboard';

export const useCategory = () => React.useContext(CategoryContext);
