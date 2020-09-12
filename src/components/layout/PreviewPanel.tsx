import React from 'react';
import { useState } from 'react';
import CardPreviewsList from '../search/CardPreviewsList';
import CardSearchBar, { SearchFilter } from '../search/CardSearchBar';

interface PreviewPanelProps {
  categoryId?: number;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({
  categoryId
}): JSX.Element => {
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
        categoryId={categoryId}
      />
    </>
  );
};

export default PreviewPanel;
