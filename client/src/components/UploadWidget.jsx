import { FileUploaderRegular } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";

export default function UploadWidget({ setImageUrl }) {
  return (
    <div className="inline-block">
      <FileUploaderRegular
        pubkey="09f4ca2f9a99b00f8848"
        onFileUploadSuccess={(result) => {
          console.log("Uploaded to Uploadcare:", result.cdnUrl);
          setImageUrl(result.cdnUrl);
        }}
      />
    </div>
  );
}
