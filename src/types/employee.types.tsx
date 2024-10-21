import { useState } from "react";

export interface EmployeeProps {

    id: string;
    name: string;
    job: string;
    admission_date: string;
    phone: string;
    image: string;
    setScrollEnabled: (scroll: boolean) => void;
  }


  