import './inputfile.scss'
import { DragEventHandler, FC, ReactNode, useState } from "react";
import { Input } from "../types";
import { VscFileMedia } from "react-icons/vsc";


export type InputFileProps = Input & {
}


export const InputFile: FC<InputFileProps> = ({
  id,
  label,
  onChange
}) => {

  const [is_dragging, set_is_dragging] = useState(false);
  const [img_string, set_img_string] = useState('')


  const onFilesDropped = (files: File[]) => {
    const file = files[0]

    const acceptedTypes = ['image/png', 'image/svg+xml', 'image/webp']

    if (!acceptedTypes.includes(file.type)) {
      alert(`File not supported: ${file.type}. Must be PNG, SVG or WebP`);
      return;
    }

    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {

      if (event !== null) {

        const file_string: string = event.target?.result as string
        console.log(file_string)
        set_img_string(file_string)

      }
    }

    reader.readAsDataURL(file)

  }


  const handleDragOver: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
  };

  const handleDragEnter: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    set_is_dragging(true);
  };

  const handleDragLeave: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    set_is_dragging(false);
  };

  const handleDrop: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    set_is_dragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length) {
      onFilesDropped(droppedFiles);
    }
  };

  return (
    <div className={utils.classname("input-file", {
      active: is_dragging
    })}
    >
      <label htmlFor={id}>
        {label ?? id}
      </label>
      <div
        className={utils.classname("drop-area", {
          'is-dragging': is_dragging
        })}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          id={id}
          type='file'
          accept="image/*"
        />
        <div className="suggestion">
          {img_string
            ? img_string
            : <VscFileMedia />
          }
          <p>
            {is_dragging
              ? 'Release.'
              : 'Choose a file or drag it here.'
            }
          </p>
        </div>
      </div>
    </div>
  )
}