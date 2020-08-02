import React, { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import { OptionsType } from "react-select";
import { TagInput, TagBase } from "../../../types/Tag";
import { TagFactory } from "../../../factories";

type TagOption = {
  label: string;
  value: TagBase;
};

const getAsOptions = (tags: TagBase[]): OptionsType<TagOption> => {
  return tags.map((tag) => ({
    label: tag.name.toLowerCase(),
    value: tag,
  }));
};

interface TagMultiSelectProps {
  onChange: (selected: TagBase[]) => void;
  selected: TagBase[];
}

const TagMultiSelect: React.FC<TagMultiSelectProps> = ({
  onChange,
  selected,
}): JSX.Element => {
  const [loadedTags, setLoadedTags] = useState<TagBase[]>([]);

  useEffect(() => {
    const fetchTags = async (): Promise<void> => {
      setLoadedTags(TagFactory.buildList(4));
    };

    fetchTags();
  }, []);

  const handleChange = (newOptions: OptionsType<TagOption> | null): void => {
    onChange(newOptions?.map((option) => option.value) || []);
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
