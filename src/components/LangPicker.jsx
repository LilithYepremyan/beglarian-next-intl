// "use client";

// import Box from "@mui/material/Box";
// import Divider from "@mui/material/Divider";
// import MenuItem from "@mui/material/MenuItem";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import Select from "@mui/material/Select";
// import { useLocale } from "next-intl";
// import { useRouter, usePathname } from "next/navigation";
// import ArrowDownIcon from "@/icons/ArrowDownIcon";

// const languages = [
//   { flag: "🇨🇳", title: "中文", id: "cn" },
//   { flag: "🇷🇺", title: "RU", id: "ru" },
//   { flag: "🇫🇷", title: "FR", id: "fr" },
//   { flag: "🇬🇧", title: "EN", id: "en" },
// ];

// export default function LangPicker({ sx, dark }) {
//   const currentLang = useLocale();
//   const router = useRouter();
//   const pathname = usePathname();

//   const currentLanguage = languages.find((x) => x.id === currentLang) ?? languages[0];

//   const handleChange = (event) => {
//     const selectedLang = event.target.value;

//     const segments = pathname.split("/");

//     segments[1] = selectedLang;

//     const newPath = segments.join("/") || "/";

//     router.push(newPath);
//     router.refresh();
//   };

//   return (
//     <Select
//       value={currentLang}
//       onChange={handleChange}
//       input={<OutlinedInput sx={{ color: "white !important" }} />}
//       IconComponent={(iconProps) => (
//         <ArrowDownIcon
//           {...iconProps}
//           sx={{
//             fontSize: "16px",
//             right: "12px !important",
//             color: !dark && "white !important",
//           }}
//         />
//       )}
//       MenuProps={{
//         anchorOrigin: { vertical: "top", horizontal: "left" },
//         transformOrigin: { vertical: "bottom", horizontal: "left" },
//         sx: {
//           ".MuiMenu-paper": {
//             transform: {
//               xs: "translate(-1px, 58px) !important",
//               sm: "translate(-3px, 58px) !important",
//             },
//           },
//         },
//       }}
//       sx={{
//         ...sx,
//         ".MuiSelect-select": {
//           color: !dark && "white !important",
//         },
//         ".MuiOutlinedInput-notchedOutline": {
//           borderColor: !dark && "transparent !important",
//         },
//         "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//           borderColor: !dark && "transparent !important",
//         },
//         "&:hover .MuiOutlinedInput-notchedOutline": {
//           borderColor: !dark && "transparent !important",
//         },
//       }}
//       renderValue={(id) => {
//         const lang = languages.find((x) => x.id === id);
//         return (
//           <Box sx={{ display: "flex", gap: "8px" }}>
//             <Box>{lang?.flag}</Box>
//             <Box>{lang?.title}</Box>
//           </Box>
//         );
//       }}
//     >
//       {languages.map((lang) => (
//         <MenuItem
//           key={lang.id}
//           value={lang.id}
//           sx={{
//             height: "48px",
//             display: "flex",
//             flexDirection: "column",
//             py: 0,
//             px: "16px",
//             alignItems: "flex-start",
//             justifyContent: "center",
//           }}
//         >
//           <Box
//             sx={{
//               fontWeight: "bold",
//               mt: "auto",
//               display: "flex",
//               gap: "8px",
//             }}
//           >
//             <Box>{lang.flag}</Box>
//             <Box>{lang.title}</Box>
//           </Box>
//           <Divider sx={{ width: "100%", marginTop: "auto" }} />
//         </MenuItem>
//       ))}
//     </Select>
//   );
// }



"use client";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import ArrowDownIcon from "@/icons/ArrowDownIcon";

const LANGUAGES = [
  { flag: "🇨🇳", title: "中文", id: "cn" },
  { flag: "🇷🇺", title: "RU", id: "ru" },
  { flag: "🇫🇷", title: "FR", id: "fr" },
  { flag: "🇬🇧", title: "EN", id: "en" },
];

export default function LangPicker({ sx, dark }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (event) => {
    const newLang = event.target.value;

    const segments = pathname.split("/");
    if (segments[1] && LANGUAGES.some((l) => l.id === segments[1])) {
      segments[1] = newLang;
    } else {
      segments.unshift(newLang);
    }

    const newPath = segments.join("/");
    router.push(newPath);
  };

  return (
    <Select
      value={locale}
      onChange={handleChange}
      input={<OutlinedInput sx={{ color: "white !important" }} />}
      IconComponent={(iconProps) => (
        <ArrowDownIcon
          {...iconProps}
          sx={{
            fontSize: "16px",
            right: "12px !important",
            color: !dark && "white !important",
          }}
        />
      )}
      MenuProps={{
        anchorOrigin: { vertical: "top", horizontal: "left" },
        transformOrigin: { vertical: "bottom", horizontal: "left" },
        sx: {
          ".MuiMenu-paper": {
            transform: {
              xs: "translate(-1px, 58px) !important",
              sm: "translate(-3px, 58px) !important",
            },
          },
        },
      }}
      sx={{
        ...sx,
        ".MuiSelect-select": {
          color: !dark && "white !important",
        },
        ".MuiOutlinedInput-notchedOutline": {
          borderColor: !dark && "transparent !important",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: !dark && "transparent !important",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: !dark && "transparent !important",
        },
      }}
      renderValue={(id) => {
        const lang = LANGUAGES.find((x) => x.id === id);
        return (
          <Box sx={{ display: "flex", gap: "8px" }}>
            <Box>{lang?.flag}</Box>
            <Box>{lang?.title}</Box>
          </Box>
        );
      }}
    >
      {LANGUAGES.map((lang) => (
        <MenuItem
          key={lang.id}
          value={lang.id}
          sx={{
            height: "48px",
            display: "flex",
            flexDirection: "column",
            py: 0,
            px: "16px",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              fontWeight: "bold",
              mt: "auto",
              display: "flex",
              gap: "8px",
            }}
          >
            <Box>{lang.flag}</Box>
            <Box>{lang.title}</Box>
          </Box>
          <Divider sx={{ width: "100%", marginTop: "auto" }} />
        </MenuItem>
      ))}
    </Select>
  );
}
