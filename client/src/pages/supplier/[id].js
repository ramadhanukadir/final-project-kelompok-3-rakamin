import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { instance } from "../../modules/axios/index";

const fetchDetail = async (id) => {
  try {
    const response = await instance.get(`suppliers/${id}`);
    const { dataSuppliers } = response.data;
    console.log(dataSuppliers);
    return dataSuppliers;
  } catch (error) {
    console.error("Gagal mengambil data:", error);
  }
};

export default function Page({ suppliersId }) {
  const [details, setDetails] = useState({});

  const router = useRouter();

  useEffect(() => {
    const detailSuppliers = async () => {
      const data = await fetchDetail(suppliersId);
      setDetails(data);
    };
    detailSuppliers();
  }, []);
  console.log(details);
  return (
    <>
      <h1 style={{ marginLeft: "600px" }}>aaaa {suppliersId}</h1>
    </>
  );
}

export const getServerSideProps = (ctx) => {
  const { id } = ctx.query;
  return { props: { suppliersId: id } };
};
