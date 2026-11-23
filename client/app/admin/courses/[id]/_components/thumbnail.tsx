"use client";

import { updateCourse, updatePreviewImage } from "@/actions/admin.action";
import Spinner from "@/components/shared/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/toast";
import { CourseType } from "@/types/app.types";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  courseData: CourseType;
}

const Thumbnail = ({ courseData }: Props) => {
  const [videoUrl, setVideoUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleVideoUpload = async () => {
    setUploadingVideo(true);
    try {
      await updateCourse(courseData._id, {
        previewVideo: videoUrl,
      });
      toast.add({
        type: "success",
        description: "Video uploaded successfully",
      });
    } catch (error) {
      const result = error as Error;
      toast.add({
        type: "error",
        description: result.message,
      });
    } finally {
      setUploadingVideo(false);
      setVideoUrl("");
    }
  };

  const handleImageUpload = async () => {
    if (!file) return;
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("previewImage", file);

      await updatePreviewImage(courseData._id, formData);
      toast.add({
        type: "success",
        description: "Preview image uploaded successfully",
      });
      setFile(null);
    } catch (error) {
      const result = error as Error;
      toast.add({
        type: "error",
        description: result.message,
      });
    } finally {
      setUploadingImage(false);
    }
  };

  useEffect(() => {
    if (courseData.previewVideo) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVideoUrl(courseData.previewVideo);
    }
  }, [courseData]);

  return (
    <div className="bg-sidebar p-6 rounded-md border">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold font-space-grotesk">
          Thumbnails
        </h2>
      </div>

      <Separator className="my-4" />

      <div className="grid grid-cols-2 gap-x-4">
        <div className="flex flex-col space-y-2">
          <div className="relative aspect-video w-full rounded-md bg-muted">
            {courseData.previewImage && (
              <Image
                src={courseData.previewImage}
                alt={courseData.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover rounded-md"
              />
            )}
            {!courseData.previewImage && (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                No preview image
              </div>
            )}
            {uploadingImage && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted bg-opacity-50 rounded-md">
                <Spinner />
              </div>
            )}
          </div>
          <div className="flex gap-2 items-center">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              disabled={uploadingImage}
            />
            <Button onClick={handleImageUpload} disabled={uploadingImage}>
              Upload
            </Button>
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <div className="aspect-video w-full rounded-md bg-muted relative">
            {courseData.previewVideo ? (
              <div
                dangerouslySetInnerHTML={{ __html: courseData.previewVideo }}
                className="absolute inset-0 flex items-center justify-center"
              ></div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                No preview video
              </div>
            )}
            {uploadingVideo && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted bg-opacity-50 rounded-md">
                <Spinner />
              </div>
            )}
          </div>
          <div className="flex gap-2 items-center">
            <Input
              type="text"
              placeholder="Enter video URL"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              disabled={uploadingVideo}
            />
            <Button
              disabled={uploadingVideo || videoUrl === courseData.previewVideo}
              onClick={handleVideoUpload}
            >
              {uploadingVideo ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thumbnail;
