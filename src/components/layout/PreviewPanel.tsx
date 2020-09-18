import React from 'react';
import { useState } from 'react';
import { useCategory } from '../../helpers/hooks';
import CardPreviewsList from '../search/CardPreviewsList';
import CardSearchBar, { SearchFilter } from '../search/CardSearchBar';

interface PreviewPanelProps {
  onCardSelect: (id: number) => void;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({
  onCardSelect
}): JSX.Element => {
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
        onCardSelect={onCardSelect}
      />
    </>
  );
};

export default PreviewPanel;
