import { useState } from "react";
import { useDropzone, DropzoneOptions, FileRejection } from "react-dropzone";
import { styled } from "@mui/system";
import { Box, SxProps, Theme, alpha, Paper, Typography } from "@mui/material";

import { fData } from "../../utils/format-number";
import ImageCropper from "./ImageCropper";
import EditCropper from "./EditCropper";
import UploadIllustration from "./Illustration";
import { BaseUrl } from "types/Index";

const DropZoneStyle = styled("div")(({ theme }: { theme: Theme }) => ({
  outline: "none",
  display: "flex",
  overflow: "hidden",
  textAlign: "center",
  position: "relative",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(5, 0),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create("padding"),
  backgroundColor: theme.palette.background.light,
  border: `1px dashed ${theme.palette.grey[500]}`,
  "&:hover": {
    opacity: 0.72,
    cursor: "pointer",
  },
  [theme.breakpoints.up("md")]: { textAlign: "left", flexDirection: "row" },
}));

interface UploadImageProps extends DropzoneOptions {
  label?: string;
  error?: boolean;
  file: string | null;
  setImage: (file: File) => void;
  cancelImage: () => void;
  reuploadImage: (file: File) => void;
  editImage?: boolean;
  aspectRatio: number;
  sx?: SxProps<Theme>;
}

const UploadImage: React.FC<UploadImageProps> = ({
  error,
  file,
  setImage,
  cancelImage,
  reuploadImage,
  editImage,
  aspectRatio,
  sx,
  ...other
}) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({
    multiple: false,
    ...other,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const onCropComplete = (croppedImageUrl: string) => {
    if (croppedImageUrl) {
      setCroppedImage(croppedImageUrl);
    }
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const ShowRejectionItems = () => (
    <Paper
      variant="outlined"
      sx={{
        py: 1,
        px: 2,
        mt: 3,
        borderColor: "error.light",
        bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
      }}>
      {fileRejections.map(({ file: image, errors }) => {
        const { path, size } = image;
        // console.log(path, size);
        return (
          <Box key={path} sx={{ my: 1 }}>
            <Typography variant="subtitle2" noWrap>
              {path} - {fData(size)}
            </Typography>
            {errors.map((e) => (
              <Typography key={e.code} variant="caption" component="p">
                - {e.message}
              </Typography>
            ))}
          </Box>
        );
      })}
    </Paper>
  );

  return (
    <Box sx={{ width: "100%", ...sx }}>
      {file ? (
        editImage ? (
          <EditCropper
            imageSrc={file}
            onCropComplete={onCropComplete}
            setImage={setImage}
            croppedImage={croppedImage}
            setCroppedImage={setCroppedImage}
            cancelImage={cancelImage}
            reuploadImage={reuploadImage}
            aspectRatio={aspectRatio}
          />
        ) : (
          <ImageCropper
            imageSrc={file}
            onCropComplete={onCropComplete}
            setImage={setImage}
            croppedImage={croppedImage}
            setCroppedImage={setCroppedImage}
            cancelImage={cancelImage}
            reuploadImage={reuploadImage}
            aspectRatio={aspectRatio}
          />
        )
      ) : (
        <DropZoneStyle
          {...getRootProps()}
          sx={{
            ...(isDragActive && { opacity: 0.72 }),
            ...((isDragReject || error) && {
              color: "error.main",
              borderColor: "error.light",
              bgcolor: "error.lighter",
            }),
            ...(file ? { padding: "12% 0" as string } : {}),
            maxWidth: 350,
            height: 350,
            display: "block",
            margin: "auto",
            marginTop: 2,
          }}>
          <input {...getInputProps()} />

          <UploadIllustration
            sx={{ width: 220, p: 1, margin: "auto", marginTop: 1 }}
          />

          <Box sx={{ p: 2, ml: { md: 2 } }}>
            <Typography
              gutterBottom
              variant="h5"
              style={{ textAlign: "center" }}>
              Drop or Select file
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Drop files here or click&nbsp;
              <Typography
                variant="body2"
                component="span"
                sx={{
                  color: "primary.main",
                  textDecoration: "underline",
                }}>
                browse
              </Typography>
              &nbsp;thorough your machine
            </Typography>
          </Box>
        </DropZoneStyle>
      )}
      <Typography
        variant="caption"
        sx={{
          mt: 2,
          mx: "auto",
          display: "block",
          textAlign: "center",
          color: "text.primary",
          margin: 1,
        }}>
        Allowed <span className="text-red">*.jpeg, *.jpg, *.png</span>
        <br /> Max size of{" "}
        <span className="text-red">{fData(other.maxSize)}</span>
        <br /> Image Ratio{" "}
        <span className="text-red">
          {aspectRatio === 1 / 2 ? "1 : 2" : "1 : 1"}
        </span>
      </Typography>
      {fileRejections.length > 0 && <ShowRejectionItems />}
    </Box>
  );
}

export default UploadImage;