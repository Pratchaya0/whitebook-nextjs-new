"use client";

import { Separator } from "@/components/ui/separator";
import { getWebInformation } from "@/data/webinfo";
import { WebInformation } from "@prisma/client";
import { useEffect, useState, useTransition } from "react";
import {
  FaEnvelope,
  FaFacebookSquare,
  FaLine,
  FaPhoneAlt,
} from "react-icons/fa";

interface FooterProps {
  data: WebInformation;
}

const Footer = ({ data }: FooterProps) => {
  console.log(data);

  return (
    <div className="flex h-5 items-center space-x-4 text-sm">
      <div className="font-bold">{data?.name}</div>
      {data?.email !== null && (
        <>
          <Separator orientation="vertical" />
          <div className="flex gap-x-2">
            <FaEnvelope className="w-4 h-4" />: {data?.email}
          </div>
        </>
      )}
      {data?.phone !== null && (
        <>
          <Separator orientation="vertical" />
          <div className="flex gap-x-2">
            <FaPhoneAlt className="w-4 h-4" />: {data?.phone}
          </div>
        </>
      )}
      {data?.facebook !== null && (
        <>
          <Separator orientation="vertical" />
          <div className="flex gap-x-2">
            <FaFacebookSquare className="w-4 h-4" />: {data?.facebook}
          </div>
        </>
      )}
      {data?.line !== null && (
        <>
          <Separator orientation="vertical" />
          <div className="flex gap-x-2">
            <FaLine className="w-4 h-4" />: {data?.line}
          </div>
        </>
      )}
    </div>
  );
};

export default Footer;
