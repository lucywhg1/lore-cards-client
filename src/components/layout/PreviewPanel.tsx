import React from 'react';
import { useState } from 'react';
import { useCategory } from '../../helpers/hooks';
import CardPreviewsList from '../search/CardPreviewsList';
import CardSearchBar, { SearchFilter } from '../search/CardSearchBar';

const PreviewPanel: React.FC = (): JSX.Element => {
  const { selectedCategory } = useCategory()!;

  const [filter, setFilter] = useState<SearchFilter>({
    body: '',
    tags: []
  });

  return (
    <>
      <div className='mb-2'>
        <CardSearchBar filter={filter} setFilter={setFilter} />
      </div>
      <CardPreviewsList
        bodyFilter={filter.body}
        tagsFilter={filter.tags}
        categoryId={selectedCategory?.id}
      />
    </>
  );
};

export default PreviewPanel;
