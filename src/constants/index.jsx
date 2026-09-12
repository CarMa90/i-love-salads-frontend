export const GROUPS = [
  { name: "Ensaladas", _id: "65f1a2b3c4d5e6f7a8b9c011" },
  { name: "Baguettes", _id: "65f1a2b3c4d5e6f7a8b9c022" },
  { name: "Sopas", _id: "65f1a2b3c4d5e6f7a8b9c033" },
  { name: "Bebidas", _id: "65f1a2b3c4d5e6f7a8b9c044" },
];

export const PRODUCTS = [
  {
    name: "E. Pollo Manzana",
    description:
      "Cama de lechuga, vinagreta de balsámico, mezcla de pollo con manzana y chile jalapeño, uvas, queso feta y almendras tostadas.",
    image: `${import.meta.env.BASE_URL}images/pollo-manzana.jpg`,
    price: 149,
    type: "Ensaladas",
    _id: "650f1f1e1c4d7b001c8e9f1a",
  },
  {
    name: "E. Mexicana",
    description:
      "Cama de lechuga, aderezo de cilantro, arrachera, tomate, granos de elote amarillo, frijol negro, aguacate, queso fresco y tiritas de tortilla.",
    image: `${import.meta.env.BASE_URL}images/pollo-manzana.jpg`,
    price: 149,
    type: "Ensaladas",
    _id: "650f1f1e1c4d7b001c8e9f1b",
  },
  {
    name: "E. Pasta al Pesto",
    description:
      "Cama de pasta fusilli, aderezo pesto, pechuga de pollo a la plancha, tomate, pimiento amarillo, aceitunas negras y queso parmesano (no contiene lechuga y se sirve fría).",
    image: `${import.meta.env.BASE_URL}images/pollo-manzana.jpg`,
    price: 149,
    type: "Ensaladas",
    _id: "64f0b2a1e4b01a2c3d4e5f6a",
  },
  {
    name: "E. Griega",
    description:
      "Cama de lechuga, vinagreta de balsámico, pechuga de pollo a la plancha, tomate, aceitunas negras, pepino, pimento amarillo y queso feta.",
    image: `${import.meta.env.BASE_URL}images/pollo-manzana.jpg`,
    price: 141,
    type: "Ensaladas",
    _id: "64f0b2a1e4b01a2c3d4e5f6b",
  },
  {
    name: "E. Oriental",
    description:
      "Cama de lechuga, aderezo oriental, pechuga de pollo a la plancha, zanahoria, repollo morado y crujientes de won ton",
    image: `${import.meta.env.BASE_URL}images/pollo-manzana.jpg`,
    price: 141,
    type: "Ensaladas",
    _id: "64f0b2a1e4b01a2c3d4e5f6c",
  },
  {
    name: "B. Pollo con Chipotle",
    description:
      "Pechuga de pollo a la plancha con crema de chipotle, mayonesa, queso monterrey, tomate, lechuga y aguacate.",
    image: `${import.meta.env.BASE_URL}images/pollo-chipotle.jpg`,
    price: 144,
    type: "Baguettes",
    _id: "650f1f1e1c4d7b001c8e9f1c",
  },
  {
    name: "B. Pollo Poblano",
    description:
      "Pechuga de pollo a la plancha con crema de chile poblano, mayonesa, queso monterrey y granos de elote amarillo.",
    image: `${import.meta.env.BASE_URL}images/pollo-chipotle.jpg`,
    price: 144,
    type: "Baguettes",
    _id: "650f1f1e1c4d7b001c8e9f1d",
  },
  {
    name: "S. de Tortilla",
    description:
      "Base de tomate, queso fresco, aguacate, tiritas de tortilla y crema ácida.",
    image: `${import.meta.env.BASE_URL}images/sopa-tortilla.jpg`,
    price: 61,
    type: "Sopas",
    _id: "507f1f77bcf86cd799439011",
  },
  {
    name: "Caldo de Res",
    description: "Pecho de res, elote, chile poblano, zanahoria, papa y arroz.",
    image: `${import.meta.env.BASE_URL}images/sopa-tortilla.jpg`,
    price: 61,
    type: "Sopas",
    _id: "64a2b2f8e4b09a123456789a",
  },
  {
    name: "Agua fresca",
    description:
      "Botella de medio litro de agua fresca natural con azúcar regular.",
    image: `${import.meta.env.BASE_URL}images/agua-fresca.jpg`,
    price: 36,
    type: "Bebidas",
    _id: "5f50c31b83f3a421b8f01234",
  },
  {
    name: "Refrescos",
    description: "Refresco en lata de 355 ml de la marca coca cola",
    image: `${import.meta.env.BASE_URL}images/agua-fresca.jpg`,
    price: 29,
    type: "Bebidas",
    _id: "60c72b2f9b1d8b0015d8123f",
  },
];

export const COUNTRIES = [
  { code: "MX", name: "México", dialCode: "+52", flag: "🇲🇽" },
  { code: "US", name: "Estados Unidos", dialCode: "+1", flag: "🇺🇸" },
  { code: "ES", name: "España", dialCode: "+34", flag: "🇪🇸" },
  { code: "AR", name: "Argentina", dialCode: "+54", flag: "🇦🇷" },
  { code: "CL", name: "Chile", dialCode: "+56", flag: "🇨🇱" },
  { code: "CO", name: "Colombia", dialCode: "+57", flag: "🇨🇴" },
  { code: "CR", name: "Costa Rica", dialCode: "+506", flag: "🇨🇷" },
  { code: "EC", name: "Ecuador", dialCode: "+593", flag: "🇪🇨" },
  { code: "GT", name: "Guatemala", dialCode: "+502", flag: "🇬🇹" },
  { code: "PE", name: "Perú", dialCode: "+51", flag: "🇵🇪" },
  { code: "VE", name: "Venezuela", dialCode: "+58", flag: "🇻🇪" },
  { code: "CA", name: "Canadá", dialCode: "+1", flag: "🇨🇦" },
  { code: "BR", name: "Brasil", dialCode: "+55", flag: "🇧🇷" },
  { code: "UY", name: "Uruguay", dialCode: "+598", flag: "🇺🇾" },
  { code: "BO", name: "Bolivia", dialCode: "+591", flag: "🇧🇴" },
  { code: "PY", name: "Paraguay", dialCode: "+595", flag: "🇵🇾" },
  { code: "SV", name: "El Salvador", dialCode: "+503", flag: "🇸🇻" },
  { code: "HN", name: "Honduras", dialCode: "+504", flag: "🇭🇳" },
  { code: "NI", name: "Nicaragua", dialCode: "+505", flag: "🇳🇮" },
  { code: "PA", name: "Panamá", dialCode: "+507", flag: "🇵🇦" },
  { code: "DO", name: "Rep. Dominicana", dialCode: "+1", flag: "🇩🇴" },
];
