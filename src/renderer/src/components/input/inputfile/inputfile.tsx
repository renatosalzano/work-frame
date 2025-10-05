import './inputfile.scss'
import { DragEventHandler, FC, useState } from "react";
import { Input } from "../types";
import { VscFileMedia, VscTrash } from "react-icons/vsc";
import { Button } from '../button';
import { useTheme } from 'hooks/useTheme';


export type InputFileProps = Input & {
}


export const InputFile: FC<InputFileProps> = ({
  id,
  value = '',
  label,
  onChange
}) => {

  const { get_color } = useTheme()

  const [is_dragging, set_is_dragging] = useState(false);
  const [img_string, set_img_string] = useState(value)


  const onFilesDropped = (files: File[]) => {
    const file = files[0]

    const acceptedTypes = ['image/png', 'image/svg+xml', 'image/webp', 'image/x-icon']

    if (!acceptedTypes.includes(file.type)) {
      console.log(`File not supported: ${file.type}. Must be PNG, SVG or WebP`);
      return;
    }

    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {

      if (event !== null) {

        const file_string: string = event.target?.result as string
        // console.log(file_string)
        set_img_string(file_string)
        onChange(id, file_string)

      }
    }

    reader.readAsDataURL(file)

  }


  const remove = () => {
    set_img_string('')
    onChange(id, '')
  }


  const handleDragOver: DragEventHandler<HTMLDivElement> = (e) => {
    console.log('drag over')
    e.preventDefault();
  };

  const handleDragEnter: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    set_is_dragging(true);
    console.log('drag enter')
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
    <div
      className={utils.classname("input-file", {
        active: is_dragging
      })}
      style={{
        // @ts-ignore
        '--droparea-bg': get_color(0.1)
      }}
    >

      <div className="label-area">
        <label htmlFor={id}>
          {label ?? id}
        </label>

        {img_string && !is_dragging && (
          <Button
            variant='icon'
            size='small'
            color='delete'
            onClick={remove}
          >
            <VscTrash />
          </Button>)
        }
      </div>

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
          onChange={(evt) => evt.target.files && onFilesDropped(Array.from(evt.target.files))}
        />
        <div className="suggestion">
          {img_string
            ? <img src={img_string} />
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