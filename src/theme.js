import { createTheme } from "@mui/material/styles";



export const breakpoints = {
  values: {
    xs: 0,
    sm: 708,
    md: 996,
    lg: 1320,
  },
};

export const HEADERHEIGHT = 64

export const colors = {
  totalBlack: "#000000",
  almostBlack: "#132146",
  almostBlackTransparent: "rgba(19, 33, 70, 0.7)",
  darkGrey: "#6D7489",
  mediumGrey: "#C5C7D0",
  lightGrey: "#EAECF1",
  brightBlue: "#0633A8",
  lightBlue: "#CDEBFF",
  lightRed: "#FAEDEB",
  red: "#D7453A",
  gold: "#F2EDE6",
  golder: "#BCA583",
  lightGreen: "#E0F1E9",
  brightGreen: "#41BD83",
  white: "#FFFFFF",
  background: "#F7F8FC",
};

export const palette = {
  colors,
  mode: "light",
  background: {
    default: colors.background,
  },
  primary: {
    main: colors.almostBlack,
    contrastText: colors.white,
  },
  secondary: {
    main: colors.lightGrey,
    contrastText: colors.almostBlack,
  },
  success: {
    main: colors.golder,
    contrastText: colors.white,
  },
  white: {
    main: colors.white,
    contrastText: colors.almostBlack,
  },
  confirm: {
    main: colors.brightGreen,
    contrastText: colors.white,
  },
  text: {
    primary: colors.almostBlack,
    secondary: colors.darkGrey,
  },
  error: {
    main: colors.red,
  },
  divider: colors.lightGrey,
};

export const typography = {
  fontFamily: "Inter",
  fontSize: 14,
  h1: {
    fontSize: "34px",
    fontFamily: "Playfair Display",
    fontWeight: 700,
    color: colors.almostBlack,
  },
  h2: {
    fontSize: "21px",
    fontFamily: "Playfair Display",
    fontWeight: 700,
    color: colors.almostBlack,
    textTransform: "uppercase",
  },
  h3: {
    fontSize: "21px",
    fontWeight: 700,
    color: colors.almostBlack,
  },
  h4: {
    fontSize: "18px",
    fontWeight: 700,
    color: colors.almostBlack,
  },
  subtitle: {
    fontSize: "12px",
    fontWeight: 400,
    color: colors.darkGrey,
  },
  body1: {
    fontSize: "14px",
    fontWeight: 400,
    color: colors.almostBlack,
  },
  body2: {
    fontSize: "14px",
    fontWeight: 400,
    color: colors.darkGrey,
  },
};

export default createTheme({
  typography,
  breakpoints: { values: breakpoints.values },
  palette,
  components: {
    MuiCssBaseline: {
      styleOverrides: `
                @font-face {
                    font-family: 'Playfair Display';
                    font-style: normal;
                    font-weight: 400;
                    src: url('/fonts/PlayfairDisplay-Regular.woff2') format('woff2'),
                    url('/fonts/PlayfairDisplay-Regular.woff') format('woff'),
                    url('/fonts/PlayfairDisplay-Regular.ttf') format('truetype');
                }

                @font-face {
                    font-family: 'Playfair Display';
                    font-style: normal;
                    font-weight: 700;
                    src: url('/fonts/PlayfairDisplay-Bold.woff2') format('woff2'),
                    url('/fonts/PlayfairDisplay-Bold.woff') format('woff'),
                    url('/fonts/PlayfairDisplay-Bold.ttf')  format('truetype');
                }

                @font-face {
                    font-family: 'Inter';
                    font-style: normal;
                    font-weight: 400;
                    src: url('/fonts/Inter-Regular.woff2') format('woff2'),
                    url('/fonts/Inter-Regular.ttf') format('woff'),
                    url('/fonts/Inter-Regular.ttf') format('truetype');
                }

                @font-face {
                    font-family: 'Inter';
                    font-style: normal;
                    font-weight: 600;
                    src: url('/fonts/Inter-SemiBold.woff2') format('woff2'),
                    url('/fonts/Inter-SemiBold.woff') format('woff'),
                    url('/fonts/Inter-SemiBold.ttf') format('truetype');
                }
            `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: 14,
          lineHeight: "20px",
          fontWeight: 600,
          textTransform: "none",
          borderRadius: 8,
          boxShadow: "none",
          padding: "14px 16px",
          position: "relative",
          overflow: "hidden",

          "&:hover": {
            boxShadow: "none",
          },

          "&.Mui-disabled": {
            background: colors.mediumGrey,
            color: colors.white,
          },

          "@keyframes animation-skeleton": {
            "0%": { transform: "translateX(-100%)" },
            "50%": { transform: "translateX(100%)" },
            "100%": { transform: "translateX(100%)" },
          },

          "&.loading": {
            cursor: "default",
            pointerEvents: "none",
            overflow: "hidden",
          },

          "&.loading:after": {
            animation:
              "1s linear 0s infinite normal none running animation-skeleton",
            background:
              "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
            content: '""',
            position: "absolute",
            transform: "translateX(-100%)",
            inset: "0px",
          },
        },
        startIcon: {
          marginRight: "8px",
          marginLeft: 0,

          "&>*:nth-of-type(1)": {
            fontSize: "16px",
          },
        },
        containedSecondary: {
          "&:hover": {
            backgroundColor: "#D4D8E0",
          },
          ".MuiTouchRipple-child": {
            backgroundColor: colors.almostBlack,
          },
        },
        containedSuccess: {
          "&:hover": {
            backgroundColor: "#AB987D",
          },
        },
        outlinedWhite: {
          color: colors.almostBlack,
          backgroundColor: colors.white,
          borderColor: colors.lightGrey,
          padding: "13px 16px",

          "&:hover": {
            borderColor: `${colors.mediumGrey} !important`,
          },

          "&.Mui-disabled": {
            background: colors.mediumGrey,
            borderColor: `${colors.mediumGrey} !important`,
            color: colors.white,
          },
        },
        containedConfirm: {
          color: colors.white,
          backgroundColor: colors.brightGreen,
          padding: "13px 16px",
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          border: `none`,
          backgroundColor: "colors.white",
          borderRadius: "8px",
          marginBottom: "24px",
          padding: "20px 32px",

          "&:not(:last-child)": {
            borderBottom: 0,
          },

          "&:before": {
            display: "none",
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          padding: 0,
        },

        expandIconWrapper: ({ ownerState }) => ({
          transform: `rotate(${
            ownerState.expanded ? "45deg" : "0deg"
          }) !important`,
          margin: 0,
          color: colors.almostBlack,
          fontSize: "24px",
        }),

        content: {
          fontWeight: "bold",
          fontSize: "20px",
          margin: 0,
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: "20px 0",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: "6px",
          padding: "0 8px",
          fontSize: "12px",
          height: "24px",
          fontWeight: 600,
        },
        label: {
          paddingLeft: 0,
          paddingRight: 0,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          fontFamily: "Inter",

          "&:hover": {
            textDecoration: "none",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          perspective: "1px",
          borderRadius: "8px !important",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          "& .MuiSlider-markLabelActive": {
            fontWeight: "bold !important",
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        input: {
          padding: "0 !important",
          paddingTop: "5px !important",
          paddingBottom: "5px !important",

          "&[type=number]::-webkit-inner-spin-button": {
            WebkitAppearance: "none",
            margin: 0,
          },
          "&[type=number]::-webkit-outer-spin-button": {
            WebkitAppearance: "none",
            margin: 0,
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          lineHeight: "20px",
          borderRadius: "8px !important",
          fontWeight: 600,

          "&.Mui-error": {
            color: colors.red,
            fontWeight: 400,
          },

          "& fieldset": {
            borderColor: colors.lightGrey,
          },

          "&.Mui-focused fieldset": {
            borderColor: `${colors.mediumGrey} !important`,
            borderWidth: `1px !important`,
          },

          "&:hover fieldset": {
            borderColor: `${colors.mediumGrey} !important`,
          },

          "&.Mui-error fieldset": {
            borderColor: colors.red,
          },

          "&.Mui-error.Mui-focused fieldset": {
            borderColor: `${colors.red} !important`,
          },

          "&.Mui-error:hover fieldset": {
            borderColor: `${colors.red} !important`,
          },
        },
        input: {
          paddingTop: "14px !important",
          paddingBottom: "14px !important",

          "&[type=number]::-webkit-inner-spin-button": {
            WebkitAppearance: "none",
            margin: 0,
          },
          "&[type=number]::-webkit-outer-spin-button": {
            WebkitAppearance: "none",
            margin: 0,
          },
        },
        inputMultiline: {
          fontWeight: "400",
          paddingTop: "0 !important",
          paddingBottom: 0,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: colors.almostBlack,
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: "inherit",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          lineHeight: "140%",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          "&:last-child": {
            paddingBottom: "16px",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: `${colors.almostBlack}`,
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          maxHeight: "270px",
          borderRadius: "8px",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: colors.lightGrey,
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        backdrop: {
          "&:not(.MuiBackdrop-invisible)": {
            backgroundColor: "rgba(19, 33, 70, 0.7)",
          },
        },
      },
    },
  },
});
