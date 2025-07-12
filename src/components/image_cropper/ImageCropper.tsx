import { Box, Button, Slider, Typography } from "@mui/material";
import { display } from "@mui/system";
import { ChangeEvent, useCallback, useState } from "react";
import Cropper, { Area, Point } from "react-easy-crop";

interface ImageCropperProps {
  imageSrc: string;
  onCropComplete: (croppedImageUrl: string) => void;
  setImage: (image: File) => void;
  croppedImage: string | null;
  setCroppedImage: (image: string | null) => void;
  cancelImage: () => void;
  reuploadImage: (file: File) => void;
  aspectRatio: number;
}

const ImageCropper: React.FC<ImageCropperProps> = ({
  imageSrc,
  onCropComplete,
  setImage,
  croppedImage,
  setCroppedImage,
  cancelImage,
  reuploadImage,
  aspectRatio,
}) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const cropWidth = aspectRatio === 1 / 2 ? 150 : 200;
  const cropHeight = aspectRatio === 1 / 2 ? 300 : 200;

  console.log('imageSrc', imageSrc);

  const onCropChange = (newCrop: Point) => {
    setCrop(newCrop);
  };

  const onZoomChange = (newZoom: number) => {
    setZoom(newZoom);
  };

  const onCropCompleteCallback = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  // Utility function to create the cropped image using canvas
  const getCroppedImg = (
    imageSrc: string,
    crop: Area,
    fileName: string
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = imageSrc;
      image.crossOrigin = "anonymous"; // to avoid cross-origin issues if image is from an external source
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject(new Error("Could not get canvas context"));
          return;
        }

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        canvas.width = crop.width;
        canvas.height = crop.height;

        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        );

        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error("Canvas is empty"));
            return;
          }
          const fileUrl = URL.createObjectURL(blob);
          resolve(fileUrl);
          const file = new File([blob], fileName, { type: "image/jpeg" });
          setImage(file);
        }, "image/jpeg");
      };
    });
  };

  const handleCrop = async () => {
    if (!croppedAreaPixels) return;
    try {
      const croppedImageUrl = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        "croppedImage.jpeg"
      );
      onCropComplete(croppedImageUrl);
    } catch (e) {
      console.error(e);
    }
  };

  // Handle file selection
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Access the selected file
    if (file) {
      //   setImage(file);
      //   setPreview(URL.createObjectURL(file)); // Create a preview URL
      // console.log("reuploadImage");
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedAreaPixels(null);
      setCroppedImage(null);
      reuploadImage(file);
    }
  };

  return croppedImage ? (
    <div>
      <Box
        component="img"
        alt="file preview"
        src={croppedImage}
        sx={{
          borderRadius: 1,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          objectFit: "cover",
          display: "block",
          margin: "auto",
          marginTop: 2,
          width: aspectRatio === 1 / 2 ? 150 : 200,
          height: aspectRatio === 1 / 2 ? 300 : 200,
        }}
      />
      {/* <Button style={{color:'',backgroundColor:''}} component="label">
            Upload new photo
            <input hidden type="file" accept="image/*"/>
        </Button> */}
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          component="label"
          color="error"
          style={{ marginTop: 20, marginBottom: 15 }}>
          Select New Image
          <input
            hidden
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </Button>
      </Box>
    </div>
  ) : (
    <div style={{ maxWidth: 330, margin: "auto", marginTop: 15 }}>
      <div style={{ position: "relative", width: "100%", height: 280 }}>
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={cropWidth / cropHeight}
          onCropChange={onCropChange}
          onZoomChange={onZoomChange}
          onCropComplete={onCropCompleteCallback}
        />
      </div>
      <div style={{ marginTop: 20 }}>
        <Typography gutterBottom>Zoom</Typography>
        <Slider
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          aria-labelledby="zoom-slider"
          onChange={(e, zoom) => onZoomChange(zoom)}
        />
      </div>
      <div style={{ marginBottom: 15 }}>
        <Button
          onClick={cancelImage}
          sx={{
            backgroundColor: "#dc2626",
            color: "white",
            margin: 1,
            "&:hover": {
              backgroundColor: "#ef4444",
              color: "white",
              margin: 1,
            },
            fontSize: 13,
          }}>
          Cancel
        </Button>
        <Button
          onClick={handleCrop}
          sx={{
            backgroundColor: "#16a34a",
            color: "white",
            margin: 1,
            "&:hover": {
              backgroundColor: "#22c55e",
              color: "white",
              margin: 1,
            },
            fontSize: 13,
          }}>
          Crop
        </Button>
      </div>
    </div>
  );
};

export default ImageCropper;
