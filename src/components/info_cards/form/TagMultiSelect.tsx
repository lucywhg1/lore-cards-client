import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import { OptionsType } from 'react-select';
import TagBase, { TagInput } from '../../../types/Tag';
import ApiService from '../../../services/ApiService';

type TagOption = {
  label: string;
  value: string;
  data: TagBase;
};

const getAsOptions = (tags: TagBase[]): OptionsType<TagOption> => {
  return tags.map((tag) => ({
    label: tag.name,
    value: `option-${tag.name}`,
    data: tag
  }));
};

interface TagMultiSelectProps {
  onChange: (selected: TagBase[]) => void;
  selected: TagBase[];
}

const TagMultiSelect: React.FC<TagMultiSelectProps> = ({
  onChange,
  selected
}): JSX.Element => {
  const [loadedTags, setLoadedTags] = useState<TagBase[]>([]);

  useEffect(() => {
    const fetchTags = async (): Promise<void> => {
      const apiService = new ApiService();

      setLoadedTags(await apiService.getTags());
    };

    fetchTags();
  }, []);

  const handleChange = (newOptions: OptionsType<TagOption> | null): void => {
    console.log('changed');
    onChange(newOptions?.map((option) => option.data) || []);
  };

  const handleCreate = (inputValue: string): void => {
    const newTag: TagInput = { name: inputValue.toLowerCase() };

    handleChange(getAsOptions(selected.concat(newTag))); // bubble up
  };

  return (
    <CreatableSelect
      isMulti
      isClearable
      options={getAsOptions(loadedTags)}
      value={getAsOptions(selected)}
      onCreateOption={handleCreate}
      onChange={(newOptions) =>
        handleChange(newOptions as OptionsType<TagOption>)
      }
      formatCreateLabel={(inputValue) => `create "${inputValue.toLowerCase()}"`}
    />
  );
};

export default TagMultiSelect;
