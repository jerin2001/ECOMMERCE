import ShortNavList from "@/src/component/ShortNavList";
import Text from "@/src/component/Text";
import Layout from "@/src/layout/Layout";
import { getItemsByID } from "@/src/redux/productsSlices";
import { filterNavItems } from "@/src/utils/Filter";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default  function collectionPage() {
  const router = useRouter();
  const { query } = router;
  // console.log("QUERY", query);
  const dispatch = useDispatch();

  const windows =
    typeof window !== "undefined" &&
     window.localStorage.getItem("userData");
  const userData = JSON.parse(windows);
 

  return (
    <Layout customClass={"gap-0"} uname={userData?.uname}>
      <ShortNavList />
      <div className="w-[100%] pl-2 pr-2 ">
        <div className="p-2 rounded-md bg-white w-[100%] flex-col flex items-center justify-center">
          <div className="w-[100%] h-[120px] border-b-2 flex-col flex items-center justify-center gap-2">
            <Text name={query.data} customClass={"text-xl font-bold"} />
            <Text
              name={filterNavItems(query.data).length + " Items"}
              customClass={"text-[gray]"}
            />
          </div>
          <div className="w-[100%] grid grid-cols-4 gap-5">
            {filterNavItems(query.data).map((i) => (
              <div
                className=" h-[300px] w-[320px] p-2 flex flex-col items-center justify-center gap-2 cursor-pointer"
                onClick={() => {
                  dispatch(getItemsByID(i._id));
                  router.push({
                    pathname: "/productPage",
                    query: i,
                  });
                }}
              >
                <div className="flex items-center justify-center w-[100%] h-[75%]">
                  <div className=" w-[70%] h-[90%] flex items-center justify-center p-2">
                    <img
                      className="object-contain h-[100%]"
                      loading="lazy"
                      src={i.image.url}
                      alt="loading"
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-1">
                  <Text customClass={"font-semibold "} name={i.title} />
                  <Text
                    customClass={"text-[green] text-sm"}
                    name={"₹ " + i.price}
                  />
                  <Text
                    customClass={"text-[gray] text-sm"}
                    name={i.description}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}