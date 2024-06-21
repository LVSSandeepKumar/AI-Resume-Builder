import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../service/GlobalApi";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

const PersonalDetailsForm = ({ enableNext }) => {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(params);
  }, []);

  const handleInputChange = (e) => {
    enableNext(false);
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
    setResumeInfo({
      ...resumeInfo,
      [name]: value,
    });
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      data: formData,
    };

    GlobalApi.UpdateResumeDetails(params?.resumeId, data).then(
      (resp) => {
        enableNext(true);
        console.log(resp);
        setLoading(false);
        toast("Details Updated")
      },
      (error) => {
        setLoading(false);
      }
    );
  };
  return (
    <div className="p-5 rounded-lg shadow-lg border-t-4 border-t-primary mt-10">
      <h2 className="font-bold text-lg">Personal Details</h2>
      <p>Get started with some basic info</p>

      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label className="text-sm">First Name</label>
            <Input name="firstName" required onChange={handleInputChange}
             defaultValue={resumeInfo?.firstName}/>
          </div>
          <div>
            <label className="text-sm">Last Name</label>
            <Input name="lastName" required onChange={handleInputChange}
             defaultValue={resumeInfo?.lastName}/>
          </div>
          <div className="col-span-2">
            <label className="text-sm">Job Title</label>
            <Input name="jobTitle" required onChange={handleInputChange}
             defaultValue={resumeInfo?.jobTitle}/>
          </div>
          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <Input name="address" required onChange={handleInputChange}
             defaultValue={resumeInfo?.address} />
          </div>
          <div>
            <label className="text-sm">Phone</label>
            <Input name="phone" required onChange={handleInputChange}
             defaultValue={resumeInfo?.phone} />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <Input name="email" required onChange={handleInputChange}
             defaultValue={resumeInfo?.email} />
          </div>
        </div>
        <div className="flex justify-end mt-3">
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetailsForm;
