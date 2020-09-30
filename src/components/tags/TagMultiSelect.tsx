import React, { useEffect, useState } from 'react';
import Select from 'react-select';

import { OptionsType, ValueType, createFilter } from 'react-select';
import { toast } from 'react-toastify';
import { Tag } from '../../types';
import TagService from '../../services/TagService';

interface TagOption {
  label: string;
  value: number; // tag id
  data: Tag;
}

const getAsOptions = (tags: Tag[]): OptionsType<TagOption> => {
  return tags.map((tag) => ({
    label: tag.name,
    value: tag.id,
    data: tag
  }));
};

interface TagMultiSelectProps {
  onChange: (selected: Tag[]) => void;
  selected: Tag[];
}

const TagMultiSelect: React.FC<TagMultiSelectProps> = ({
  onChange,
  selected
}): JSX.Element => {
  const [loadedTags, setLoadedTags] = useState<Tag[]>([]);
  const filterConfig = createFilter({ ignoreCase: true });

  useEffect(() => {
    const fetchTags = async (): Promise<void> => {
      const tagService = new TagService();

      tagService
        .getAll()
        .then((response) => setLoadedTags(response))
        .catch((e: Error) => toast.error(`Unable to get Tags. ${e.message}`));
    };

    fetchTags();
  }, []);

  const handleChange = (newOptions: ValueType<TagOption>): void => {
    onChange(
      ((newOptions as OptionsType<TagOption>) || []).map(
        (option) => option.data
      ) || []
    );
  };

  return (
    <Select
      isMulti
      options={getAsOptions(loadedTags)}
      value={getAsOptions(selected)}
      onChange={handleChange}
      filterOption={filterConfig}
      placeholder='Tags...'
      data-testid='tag-multi-select'
    />
  );
};

export default TagMultiSelect;
