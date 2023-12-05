import { useState, HTMLProps, useRef } from 'react'
import { BiSolidFileImage } from 'react-icons/bi'
// import { MdDelete } from 'react-icons/md'
import { TbCloudUpload } from 'react-icons/tb'
import styles from './styles.module.css'

interface Props extends HTMLProps<HTMLInputElement> {
  onFileChange: (file: File) => void
}

export default function FileInput(props: Props) {
  const [metaData, setMetaData] = useState({ fileSize: 0, fileName: '' })

  const ref = useRef<HTMLInputElement>(null)

  const handleFileChange = () => {
    if (ref.current) {
      const selectedFile = ref.current?.files?.[0]

      if (selectedFile) {
        setMetaData((p) => ({
          ...p,
          fileName: selectedFile.name,
          fileSize: Number((selectedFile.size / 1024).toFixed(1)),
        }))
        props.onFileChange(selectedFile)
      }
    }
  }
  return (
    <>
      <div className={styles.upload_files_container}>
        <div className={styles.drag_file_area}>
          <TbCloudUpload />
          <label>
            Upload photo
            <input
              ref={ref}
              type='file'
              accept='image/*'
              onChange={handleFileChange}
              {...props}
            />
          </label>
        </div>
      </div>
      {metaData.fileName && (
        <div className={styles.file_meta}>
          <div>
            <BiSolidFileImage />
            <p>{metaData.fileName}</p>
          </div>
          <div className={styles.delete_file}>
            <p>{metaData.fileSize} KB</p>
            {/* <MdDelete /> */}
          </div>
        </div>
      )}
    </>
  )
}

export { FileInput }
