import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { TModelAggregateResponse } from "@/types/analytics";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ------------------------------
// 12 months name in a array
export const monthsInYear = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const formatDataForRecharts = (props: TModelAggregateResponse) => {
  const userStats = props?.userStats ?? [];
  const postStats = props?.postStats ?? [];
  const reportStats = props?.reportStats ?? [];
  const data = Array(12)
    .fill(0)
    .map((_, i) => ({
      month: monthsInYear[i],
      users: 0,
      posts: 0,
      reports: 0,
    }));

  userStats.forEach((stat) => {
    data[stat._id - 1].users = stat.count;
  });

  postStats.forEach((stat) => {
    data[stat._id - 1].posts = stat.count;
  });

  reportStats.forEach((stat) => {
    data[stat._id - 1].reports = stat.count;
  });

  return data;
};
// ------------------------------

export const category = [
  {
    cat_id: "728d129f-09be-5274-8287-908db271d20a",
    cat_image:
      "https://static.chotot.com/storage/chapy-pro/newcats/v8/1000.png",
    cat_name: "Bất động sản",
    cat_icon: "home-city",
    position: 1,
  },
  // {
  //   cat_id: '302554c7-5745-539d-b244-c6b0ba907d50',
  //   cat_image:
  //     'himage://static.chotot.com/storage/chapy-pro/newcats/v8/13000.png',
  //   cat_name: 'Việc làm',
  //   cat_icon: 'account-hard-hat',
  //   position: 2,
  // },
  {
    cat_id: "776400e8-be71-548c-a69c-3e4751138acf",
    cat_image:
      "https://static.chotot.com/storage/chapy-pro/newcats/v8/2000.png",
    cat_name: "Xe cộ",
    cat_icon: "car-estate",
    position: 3,
  },
  {
    cat_id: "f0c5f4fd-be3b-5f07-b135-a343d65bfe66",
    cat_image:
      "himage://static.chotot.com/storage/chapy-pro/newcats/v8/12000.png",
    cat_name: "Thú cưng",
    cat_icon: "paw",
    position: 4,
  },
  {
    cat_id: "8c236fcb-c528-554c-a2e1-fd9f97e89360",
    cat_image:
      "https://static.chotot.com/storage/chapy-pro/newcats/v8/5000.png",
    cat_name: "Đồ điện tử",
    cat_icon: "cellphone-link",
    position: 5,
  },
  // {
  //   cat_id: 'a989e22c-cde9-518c-88eb-c91525cd7c5c',
  //   cat_image:
  //     'https://static.chotot.com/storage/chapy-pro/newcats/v8/7000.png',
  //   cat_name: 'Đồ ăn, thực phẩm và các loại khác',
  //   cat_icon: 'home-city',
  //   position: 6,
  // },
  {
    cat_id: "0219e227-f631-5d24-bbba-17431f74fa8a",
    cat_image:
      "himage://static.chotot.com/storage/chapy-pro/newcats/v8/14000.png",
    cat_name: "Đồ gia dụng",
    cat_icon: "table-furniture",
    position: 7,
  },
  // {
  //   cat_id: 'fb784283-2ab0-54cd-a01e-246c2c2304ac',
  //   cat_image:
  //     'https://static.chotot.com/storage/chapy-pro/newcats/v8/9000.png',
  //   cat_name: 'Tủ lạnh, máy lạnh, máy giặt',
  //   cat_icon: 'home-city',
  //   position: 8,
  // },
  {
    cat_id: "2342932c-e8c4-5bda-bbf0-5ceffa4c9044",
    cat_image:
      "https://static.chotot.com/storage/chapy-pro/newcats/v8/4000.png",
    cat_name: "Giải trí, Thể thao, Sở thích",
    cat_icon: "dumbbell",
    position: 9,
  },
  {
    cat_id: "58874657-581b-5672-92e5-1859b0ab8148",
    cat_image:
      "https://static.chotot.com/storage/chapy-pro/newcats/v8/3000.png",
    cat_name: "Thời trang, Đồ dùng cá nhân",
    cat_icon: "tshirt-v",
    position: 10,
  },
  // {
  //   cat_id: 'cf7a2242-1c4b-5767-bd40-430c5a366365',
  //   cat_image:
  //     'himage://static.chotot.com/storage/chapy-pro/newcats/v8/11000.png',
  //   cat_name: 'Mẹ và bé',
  //   cat_icon: 'home-city',
  //   position: 11,
  // },
  {
    cat_id: "9ef71d51-35ff-5cec-ad2a-90be9f2af672",
    cat_image:
      "https://static.chotot.com/storage/chapy-pro/newcats/v8/8000.png",
    cat_name: "Đồ dùng văn phòng, công nông nghiệp",
    cat_icon: "printer",
    position: 12,
  },
  {
    cat_id: "f4d63555-456c-5891-b066-8677e1f5c95e",
    cat_image:
      "https://static.chotot.com/storage/chapy-pro/newcats/v8/6000.png",
    cat_name: "Dịch vụ, Du lịch",
    cat_icon: "account-wrench",
    position: 13,
  },
];

// ------------------------------

export const statusPost = [
  {
    id: "c780470e-7bb7-5aec-8187-13e74055ec02",
    name: "Mới",
    name_en: "New",
    description: "Chưa sử dụng, còn nguyên tem và hộp đóng gói.",
  },
  {
    id: "68de2671-c0d0-52a2-852b-a0c2d1bfe281",
    name: "Như mới",
    name_en: "LikeNew",
    description: "Sử dụng ít và hoạt động tốt, nhưng không còn nguyên hộp.",
  },
  {
    id: "48a0bab5-e7d2-57af-add0-dcb28d621909",
    name: "Tốt",
    name_en: "Good",
    description: "Sử dụng nhẹ và có vài vết xước nhỏ.",
  },
  {
    id: "168312d9-d07b-515d-aeb4-21a760c256c6",
    name: "Khá",
    name_en: "FalfGood",
    description: "Đã sử dụng và có nhiều vết xước.",
  },
  {
    id: "f4c0225c-cce9-5c14-81d1-b63348d2fc55",
    name: "Kém",
    name_en: "Bad",
    description: "Sử dụng nhiều và có lỗi hoặc hư hỏng.",
  },
  {
    id: "ba84a068-16fd-5082-83bc-a08f1533f20d",
    name: "Không áp dụng",
    name_en: "NotApply",
    description: "Không phải các lựa chọn trên",
  },
];

// ------------------------------

// enum for report post
export enum EReportReasonTypes {
  FRAUD = "fraud",
  DUPLICATE = "duplicate",
  ITEM_SOLD = "itemSold",
  UNABLE_TO_CONTACT = "unableToContact",
  INACCURATE_CONTENT = "inaccurateContent",
  COUNTERFEIT_GOODS = "counterfeitGoods",
  ITEM_DAMAGED_AFTER_PURCHASE = "itemDamagedAfterPurchase",
}

// map report reason type to label

export const reportReasonTypeToLabel = {
  [EReportReasonTypes.FRAUD]: "Lừa đảo",
  [EReportReasonTypes.DUPLICATE]: "Trùng lặp",
  [EReportReasonTypes.ITEM_SOLD]: "Hàng đã bán",
  [EReportReasonTypes.UNABLE_TO_CONTACT]: "Không liên lạc được",
  [EReportReasonTypes.INACCURATE_CONTENT]: "Thông tin không đúng thực tế",
  [EReportReasonTypes.COUNTERFEIT_GOODS]: "Hàng giả, hàng nhái, hàng dựng",
  [EReportReasonTypes.ITEM_DAMAGED_AFTER_PURCHASE]: "Hàng hư hỏng sau khi mua",
};

// ------------------------------
