import { r as reactExports, j as jsxRuntimeExports, n as useComposedRefs, a as cn, e as ListingCategory, I as Input, i as ListingCondition, B as Button, X, h as Badge, b as useNavigate, q as useSearch, u as useBackend, d as useQuery, S as Search, f as LoadingSkeleton } from "./index-gsR6w5On.js";
import { d as Presence, P as Primitive, b as useControllableState, c as composeEventHandlers, a as createContextScope } from "./index-BnjX19SW.js";
import { f as usePrevious, g as useSize, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DELqebDA.js";
import { C as Check, L as Label } from "./label-BFKrZYP4.js";
import { P as Primitive$1 } from "./index-DEJXbCLB.js";
import { L as ListingCard } from "./ListingCard-DPbdLi2L.js";
import { S as SlidersHorizontal, a as Sheet, b as SheetContent, c as SheetHeader, d as SheetTitle } from "./sheet-_ifshiiL.js";
import { P as PackageSearch } from "./package-search-D9olYAaU.js";
import "./index-T7DfQMot.js";
import "./index-Rc_OAgpw.js";
var CHECKBOX_NAME = "Checkbox";
var [createCheckboxContext] = createContextScope(CHECKBOX_NAME);
var [CheckboxProviderImpl, useCheckboxContext] = createCheckboxContext(CHECKBOX_NAME);
function CheckboxProvider(props) {
  const {
    __scopeCheckbox,
    checked: checkedProp,
    children,
    defaultChecked,
    disabled,
    form,
    name,
    onCheckedChange,
    required,
    value = "on",
    // @ts-expect-error
    internal_do_not_use_render
  } = props;
  const [checked, setChecked] = useControllableState({
    prop: checkedProp,
    defaultProp: defaultChecked ?? false,
    onChange: onCheckedChange,
    caller: CHECKBOX_NAME
  });
  const [control, setControl] = reactExports.useState(null);
  const [bubbleInput, setBubbleInput] = reactExports.useState(null);
  const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
  const isFormControl = control ? !!form || !!control.closest("form") : (
    // We set this to true by default so that events bubble to forms without JS (SSR)
    true
  );
  const context = {
    checked,
    disabled,
    setChecked,
    control,
    setControl,
    name,
    form,
    value,
    hasConsumerStoppedPropagationRef,
    required,
    defaultChecked: isIndeterminate(defaultChecked) ? false : defaultChecked,
    isFormControl,
    bubbleInput,
    setBubbleInput
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CheckboxProviderImpl,
    {
      scope: __scopeCheckbox,
      ...context,
      children: isFunction(internal_do_not_use_render) ? internal_do_not_use_render(context) : children
    }
  );
}
var TRIGGER_NAME = "CheckboxTrigger";
var CheckboxTrigger = reactExports.forwardRef(
  ({ __scopeCheckbox, onKeyDown, onClick, ...checkboxProps }, forwardedRef) => {
    const {
      control,
      value,
      disabled,
      checked,
      required,
      setControl,
      setChecked,
      hasConsumerStoppedPropagationRef,
      isFormControl,
      bubbleInput
    } = useCheckboxContext(TRIGGER_NAME, __scopeCheckbox);
    const composedRefs = useComposedRefs(forwardedRef, setControl);
    const initialCheckedStateRef = reactExports.useRef(checked);
    reactExports.useEffect(() => {
      const form = control == null ? void 0 : control.form;
      if (form) {
        const reset = () => setChecked(initialCheckedStateRef.current);
        form.addEventListener("reset", reset);
        return () => form.removeEventListener("reset", reset);
      }
    }, [control, setChecked]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        role: "checkbox",
        "aria-checked": isIndeterminate(checked) ? "mixed" : checked,
        "aria-required": required,
        "data-state": getState(checked),
        "data-disabled": disabled ? "" : void 0,
        disabled,
        value,
        ...checkboxProps,
        ref: composedRefs,
        onKeyDown: composeEventHandlers(onKeyDown, (event) => {
          if (event.key === "Enter") event.preventDefault();
        }),
        onClick: composeEventHandlers(onClick, (event) => {
          setChecked((prevChecked) => isIndeterminate(prevChecked) ? true : !prevChecked);
          if (bubbleInput && isFormControl) {
            hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
            if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
          }
        })
      }
    );
  }
);
CheckboxTrigger.displayName = TRIGGER_NAME;
var Checkbox$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeCheckbox,
      name,
      checked,
      defaultChecked,
      required,
      disabled,
      value,
      onCheckedChange,
      form,
      ...checkboxProps
    } = props;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      CheckboxProvider,
      {
        __scopeCheckbox,
        checked,
        defaultChecked,
        disabled,
        required,
        onCheckedChange,
        name,
        form,
        value,
        internal_do_not_use_render: ({ isFormControl }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CheckboxTrigger,
            {
              ...checkboxProps,
              ref: forwardedRef,
              __scopeCheckbox
            }
          ),
          isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
            CheckboxBubbleInput,
            {
              __scopeCheckbox
            }
          )
        ] })
      }
    );
  }
);
Checkbox$1.displayName = CHECKBOX_NAME;
var INDICATOR_NAME = "CheckboxIndicator";
var CheckboxIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeCheckbox, forceMount, ...indicatorProps } = props;
    const context = useCheckboxContext(INDICATOR_NAME, __scopeCheckbox);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Presence,
      {
        present: forceMount || isIndeterminate(context.checked) || context.checked === true,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.span,
          {
            "data-state": getState(context.checked),
            "data-disabled": context.disabled ? "" : void 0,
            ...indicatorProps,
            ref: forwardedRef,
            style: { pointerEvents: "none", ...props.style }
          }
        )
      }
    );
  }
);
CheckboxIndicator.displayName = INDICATOR_NAME;
var BUBBLE_INPUT_NAME = "CheckboxBubbleInput";
var CheckboxBubbleInput = reactExports.forwardRef(
  ({ __scopeCheckbox, ...props }, forwardedRef) => {
    const {
      control,
      hasConsumerStoppedPropagationRef,
      checked,
      defaultChecked,
      required,
      disabled,
      name,
      value,
      form,
      bubbleInput,
      setBubbleInput
    } = useCheckboxContext(BUBBLE_INPUT_NAME, __scopeCheckbox);
    const composedRefs = useComposedRefs(forwardedRef, setBubbleInput);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = bubbleInput;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      const bubbles = !hasConsumerStoppedPropagationRef.current;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        input.indeterminate = isIndeterminate(checked);
        setChecked.call(input, isIndeterminate(checked) ? false : checked);
        input.dispatchEvent(event);
      }
    }, [bubbleInput, prevChecked, checked, hasConsumerStoppedPropagationRef]);
    const defaultCheckedRef = reactExports.useRef(isIndeterminate(checked) ? false : checked);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.input,
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: defaultChecked ?? defaultCheckedRef.current,
        required,
        disabled,
        name,
        value,
        form,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0,
          // We transform because the input is absolutely positioned but we have
          // rendered it **after** the button. This pulls it back to sit on top
          // of the button.
          transform: "translateX(-100%)"
        }
      }
    );
  }
);
CheckboxBubbleInput.displayName = BUBBLE_INPUT_NAME;
function isFunction(value) {
  return typeof value === "function";
}
function isIndeterminate(checked) {
  return checked === "indeterminate";
}
function getState(checked) {
  return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
function Checkbox({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Checkbox$1,
    {
      "data-slot": "checkbox",
      className: cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        CheckboxIndicator,
        {
          "data-slot": "checkbox-indicator",
          className: "flex items-center justify-center text-current transition-none",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3.5" })
        }
      )
    }
  );
}
var NAME = "Separator";
var DEFAULT_ORIENTATION = "horizontal";
var ORIENTATIONS = ["horizontal", "vertical"];
var Separator$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { decorative, orientation: orientationProp = DEFAULT_ORIENTATION, ...domProps } = props;
  const orientation = isValidOrientation(orientationProp) ? orientationProp : DEFAULT_ORIENTATION;
  const ariaOrientation = orientation === "vertical" ? orientation : void 0;
  const semanticProps = decorative ? { role: "none" } : { "aria-orientation": ariaOrientation, role: "separator" };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive$1.div,
    {
      "data-orientation": orientation,
      ...semanticProps,
      ...domProps,
      ref: forwardedRef
    }
  );
});
Separator$1.displayName = NAME;
function isValidOrientation(orientation) {
  return ORIENTATIONS.includes(orientation);
}
var Root = Separator$1;
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
const CATEGORY_LABELS = {
  [ListingCategory.sarees]: "Sarees",
  [ListingCategory.kurtis]: "Kurtis",
  [ListingCategory.lehengas]: "Lehengas",
  [ListingCategory.salwarSuits]: "Salwar Suits",
  [ListingCategory.accessories]: "Accessories",
  [ListingCategory.jewelry]: "Jewellery",
  [ListingCategory.footwear]: "Footwear",
  [ListingCategory.other]: "Other"
};
const CONDITION_LABELS = {
  [ListingCondition.brandNew]: "Brand New",
  [ListingCondition.likeNew]: "Like New",
  [ListingCondition.good]: "Good",
  [ListingCondition.fair]: "Fair",
  [ListingCondition.poor]: "Poor"
};
const CITY_OPTIONS = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Chennai",
  "Hyderabad",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Surat"
];
function toggleItem(arr, val) {
  return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
}
function FilterPanel({
  filters,
  onChange,
  onApply,
  onReset
}) {
  const hasActiveFilters = filters.categories.length > 0 || filters.conditions.length > 0 || filters.minPrice !== "" || filters.maxPrice !== "" || filters.location !== "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-5", "data-ocid": "search.filter_panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2.5 text-sm font-semibold text-foreground", children: "Category" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: Object.values(ListingCategory).map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Checkbox,
          {
            id: `cat-${cat}`,
            checked: filters.categories.includes(cat),
            onCheckedChange: () => onChange({
              ...filters,
              categories: toggleItem(filters.categories, cat)
            }),
            "data-ocid": `search.filter.category.${cat}`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Label,
          {
            htmlFor: `cat-${cat}`,
            className: "cursor-pointer text-sm font-normal",
            children: CATEGORY_LABELS[cat]
          }
        )
      ] }, cat)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2.5 text-sm font-semibold text-foreground", children: "Price Range (₹)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "number",
            min: 0,
            placeholder: "Min",
            value: filters.minPrice,
            onChange: (e) => onChange({ ...filters, minPrice: e.target.value }),
            className: "h-8 text-sm",
            "data-ocid": "search.filter.price_min"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "–" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "number",
            min: 0,
            placeholder: "Max",
            value: filters.maxPrice,
            onChange: (e) => onChange({ ...filters, maxPrice: e.target.value }),
            className: "h-8 text-sm",
            "data-ocid": "search.filter.price_max"
          }
        )
      ] }),
      (filters.minPrice !== "" || filters.maxPrice !== "") && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1.5 text-xs text-muted-foreground", children: [
        "₹",
        filters.minPrice || "0",
        " – ₹",
        filters.maxPrice || "∞"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2.5 text-sm font-semibold text-foreground", children: "Condition" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: Object.values(ListingCondition).map((cond) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Checkbox,
          {
            id: `cond-${cond}`,
            checked: filters.conditions.includes(cond),
            onCheckedChange: () => onChange({
              ...filters,
              conditions: toggleItem(filters.conditions, cond)
            }),
            "data-ocid": `search.filter.condition.${cond}`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Label,
          {
            htmlFor: `cond-${cond}`,
            className: "cursor-pointer text-sm font-normal",
            children: CONDITION_LABELS[cond]
          }
        )
      ] }, cond)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2.5 text-sm font-semibold text-foreground", children: "Location" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: filters.location,
          onValueChange: (v) => onChange({ ...filters, location: v }),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "h-9 text-sm",
                "data-ocid": "search.filter.location_select",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All cities" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "", children: "All cities" }),
              CITY_OPTIONS.map((city) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: city, children: city }, city))
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          className: "flex-1",
          size: "sm",
          onClick: onApply,
          "data-ocid": "search.filter.apply_button",
          children: "Apply Filters"
        }
      ),
      hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: onReset,
          "data-ocid": "search.filter.reset_button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" })
        }
      )
    ] }),
    hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5", children: [
      filters.categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Badge,
        {
          variant: "secondary",
          className: "cursor-pointer gap-1 pr-1 text-xs",
          onClick: () => onChange({
            ...filters,
            categories: filters.categories.filter((c) => c !== cat)
          }),
          children: [
            CATEGORY_LABELS[cat],
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" })
          ]
        },
        cat
      )),
      filters.conditions.map((cond) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Badge,
        {
          variant: "secondary",
          className: "cursor-pointer gap-1 pr-1 text-xs",
          onClick: () => onChange({
            ...filters,
            conditions: filters.conditions.filter((c) => c !== cond)
          }),
          children: [
            CONDITION_LABELS[cond],
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" })
          ]
        },
        cond
      ))
    ] })
  ] });
}
const SORT_OPTIONS = [
  { value: "relevance", label: "Relevance" },
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" }
];
const PAGE_SIZE = 12;
const LOAD_MORE_STEP = 12;
function parseList(raw) {
  if (!raw) return [];
  return raw.split(",").map((s) => s.trim()).filter(Boolean);
}
function buildFilter(keyword, categories, conditions, minPrice, maxPrice, location) {
  return {
    keyword: keyword || void 0,
    category: categories.length === 1 ? categories[0] : void 0,
    condition: conditions.length === 1 ? conditions[0] : void 0,
    location: location || void 0,
    minPrice: minPrice ? BigInt(Math.round(Number(minPrice))) : void 0,
    maxPrice: maxPrice ? BigInt(Math.round(Number(maxPrice))) : void 0
  };
}
function sortItems(items, sort) {
  const arr = [...items];
  if (sort === "newest")
    return arr.sort((a, b) => Number(b.createdAt - a.createdAt));
  if (sort === "price_asc")
    return arr.sort((a, b) => Number(a.price - b.price));
  if (sort === "price_desc")
    return arr.sort((a, b) => Number(b.price - a.price));
  return arr;
}
function ZeroResults({
  hasFilters,
  keyword,
  fallbackItems,
  onClearFilters
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "search.empty_state", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 py-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-20 w-20 items-center justify-center rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PackageSearch, { className: "h-10 w-10 text-muted-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-foreground", children: keyword ? `No results for “${keyword}”` : "No listings found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 max-w-xs text-sm text-muted-foreground", children: hasFilters ? "Try removing some filters or broadening your search." : "Try a different keyword or check back later." })
      ] }),
      hasFilters && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          onClick: onClearFilters,
          "data-ocid": "search.empty_state.clear_button",
          children: "Remove all filters"
        }
      )
    ] }),
    ((fallbackItems == null ? void 0 : fallbackItems.length) ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-sm font-medium text-muted-foreground", children: "You might like these" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4", children: fallbackItems.map((listing, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        ListingCard,
        {
          listing,
          index: i
        },
        String(listing.id)
      )) })
    ] })
  ] });
}
function SearchPage() {
  var _a;
  const navigate = useNavigate();
  const params = useSearch({ from: "/search" });
  const { actor, isReady } = useBackend();
  const [localKeyword, setLocalKeyword] = reactExports.useState(params.keyword ?? "");
  const debounceRef = reactExports.useRef(null);
  const [showMobileFilters, setShowMobileFilters] = reactExports.useState(false);
  const [visibleCount, setVisibleCount] = reactExports.useState(PAGE_SIZE);
  const activeCategories = parseList(params.category);
  const activeConditions = parseList(params.condition);
  const currentSort = params.sort ?? "relevance";
  const [draftFilters, setDraftFilters] = reactExports.useState({
    categories: activeCategories,
    conditions: activeConditions,
    minPrice: params.minPrice ?? "",
    maxPrice: params.maxPrice ?? "",
    location: params.location ?? ""
  });
  reactExports.useEffect(() => {
    setDraftFilters({
      categories: parseList(params.category),
      conditions: parseList(params.condition),
      minPrice: params.minPrice ?? "",
      maxPrice: params.maxPrice ?? "",
      location: params.location ?? ""
    });
    setLocalKeyword(params.keyword ?? "");
    setVisibleCount(PAGE_SIZE);
  }, [
    params.keyword,
    params.category,
    params.condition,
    params.minPrice,
    params.maxPrice,
    params.location
  ]);
  const handleKeywordChange = (value) => {
    setLocalKeyword(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      navigate({
        to: "/search",
        search: { ...params, keyword: value || void 0 }
      });
    }, 300);
  };
  const applyFilters = (filters, close = false) => {
    navigate({
      to: "/search",
      search: {
        keyword: params.keyword,
        category: filters.categories.join(",") || void 0,
        condition: filters.conditions.join(",") || void 0,
        minPrice: filters.minPrice || void 0,
        maxPrice: filters.maxPrice || void 0,
        location: filters.location || void 0,
        sort: currentSort !== "relevance" ? currentSort : void 0
      }
    });
    if (close) setShowMobileFilters(false);
  };
  const resetFilters = () => {
    const cleared = {
      categories: [],
      conditions: [],
      minPrice: "",
      maxPrice: "",
      location: ""
    };
    setDraftFilters(cleared);
    navigate({
      to: "/search",
      search: {
        keyword: params.keyword,
        category: void 0,
        condition: void 0,
        location: void 0,
        minPrice: void 0,
        maxPrice: void 0,
        sort: currentSort !== "relevance" ? currentSort : void 0
      }
    });
    setShowMobileFilters(false);
  };
  const updateSort = (sort) => {
    navigate({
      to: "/search",
      search: { ...params, sort: sort !== "relevance" ? sort : void 0 }
    });
  };
  const filter = reactExports.useMemo(
    () => buildFilter(
      params.keyword ?? "",
      activeCategories,
      activeConditions,
      params.minPrice ?? "",
      params.maxPrice ?? "",
      params.location ?? ""
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      params.keyword,
      activeCategories,
      activeConditions,
      params.minPrice,
      params.maxPrice,
      params.location
    ]
  );
  const { data, isLoading } = useQuery({
    queryKey: ["search", filter],
    queryFn: async () => {
      if (!actor) return { total: BigInt(0), items: [] };
      return actor.searchListings(filter, BigInt(0), BigInt(200));
    },
    enabled: isReady
  });
  const { data: featuredData } = useQuery({
    queryKey: ["featured", "search-fallback"],
    queryFn: async () => {
      if (!actor) return { total: BigInt(0), items: [] };
      return actor.getFeaturedListings(BigInt(0), BigInt(4));
    },
    enabled: isReady && !isLoading && (((_a = data == null ? void 0 : data.items) == null ? void 0 : _a.length) ?? 0) === 0
  });
  const allItems = reactExports.useMemo(
    () => sortItems((data == null ? void 0 : data.items) ?? [], currentSort),
    [data == null ? void 0 : data.items, currentSort]
  );
  const visibleItems = allItems.slice(0, visibleCount);
  const total = allItems.length;
  const hasMore = visibleCount < total;
  const activeFilterCount = activeCategories.length + activeConditions.length + (params.minPrice || params.maxPrice ? 1 : 0) + (params.location ? 1 : 0);
  const hasActiveFilters = activeFilterCount > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-screen-xl px-4 py-6", "data-ocid": "search.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: localKeyword,
            onChange: (e) => handleKeywordChange(e.target.value),
            placeholder: "Search sarees, lehengas, kurtis...",
            className: "h-10 pl-9",
            "data-ocid": "search.keyword_input"
          }
        ),
        localKeyword && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => handleKeywordChange(""),
            className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
            "aria-label": "Clear search",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          className: "relative h-10 gap-1.5 lg:hidden",
          onClick: () => setShowMobileFilters(true),
          "data-ocid": "search.mobile_filters_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "h-4 w-4" }),
            "Filters",
            activeFilterCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground", children: activeFilterCount })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "hidden w-56 flex-shrink-0 lg:block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-4 rounded-xl border border-border bg-card p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground", children: "Filters" }),
          hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: resetFilters,
              className: "text-xs text-primary hover:underline",
              "data-ocid": "search.filter.clear_all",
              children: "Clear all"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FilterPanel,
          {
            filters: draftFilters,
            onChange: setDraftFilters,
            onApply: () => applyFilters(draftFilters),
            onReset: resetFilters
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex flex-wrap items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-sm text-muted-foreground",
              "data-ocid": "search.result_count",
              children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block h-4 w-24 animate-pulse rounded bg-muted" }) : total > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: total.toLocaleString() }),
                " ",
                total === 1 ? "result" : "results",
                params.keyword && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  " for “",
                  params.keyword,
                  "”"
                ] })
              ] }) : null
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: currentSort, onValueChange: updateSort, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "h-9 w-auto min-w-[160px] text-sm",
                "data-ocid": "search.sort_select",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: SORT_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: opt.value, children: opt.label }, opt.value)) })
          ] })
        ] }),
        hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "mb-4 flex flex-wrap gap-1.5",
            "data-ocid": "search.active_filters",
            children: [
              activeCategories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  variant: "secondary",
                  className: "cursor-pointer gap-1 pr-1.5 text-xs",
                  onClick: () => navigate({
                    to: "/search",
                    search: {
                      ...params,
                      category: activeCategories.filter((c) => c !== cat).join(",") || void 0
                    }
                  }),
                  "data-ocid": `search.chip.category.${cat}`,
                  children: [
                    CATEGORY_LABELS[cat],
                    /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" })
                  ]
                },
                cat
              )),
              activeConditions.map((cond) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  variant: "secondary",
                  className: "cursor-pointer gap-1 pr-1.5 text-xs",
                  onClick: () => navigate({
                    to: "/search",
                    search: {
                      ...params,
                      condition: activeConditions.filter((c) => c !== cond).join(",") || void 0
                    }
                  }),
                  "data-ocid": `search.chip.condition.${cond}`,
                  children: [
                    CONDITION_LABELS[cond],
                    /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" })
                  ]
                },
                cond
              )),
              (params.minPrice || params.maxPrice) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  variant: "secondary",
                  className: "cursor-pointer gap-1 pr-1.5 text-xs",
                  onClick: () => navigate({
                    to: "/search",
                    search: {
                      ...params,
                      minPrice: void 0,
                      maxPrice: void 0
                    }
                  }),
                  "data-ocid": "search.chip.price_range",
                  children: [
                    "₹",
                    params.minPrice ?? "0",
                    "–₹",
                    params.maxPrice ?? "∞",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" })
                  ]
                }
              ),
              params.location && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  variant: "secondary",
                  className: "cursor-pointer gap-1 pr-1.5 text-xs",
                  onClick: () => navigate({
                    to: "/search",
                    search: { ...params, location: void 0 }
                  }),
                  "data-ocid": "search.chip.location",
                  children: [
                    CITY_OPTIONS.find((c) => c === params.location) ?? params.location,
                    /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  variant: "outline",
                  className: "cursor-pointer gap-1 pr-1.5 text-xs text-muted-foreground hover:text-foreground",
                  onClick: resetFilters,
                  "data-ocid": "search.chip.clear_all",
                  children: [
                    "Clear all",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" })
                  ]
                }
              )
            ]
          }
        ),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSkeleton, { variant: "card", count: 8, className: "contents" }) }) : total === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          ZeroResults,
          {
            hasFilters: hasActiveFilters,
            keyword: params.keyword,
            fallbackItems: featuredData == null ? void 0 : featuredData.items,
            onClearFilters: resetFilters
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4",
              "data-ocid": "search.results_list",
              children: visibleItems.map((listing, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                ListingCard,
                {
                  listing,
                  index: i
                },
                String(listing.id)
              ))
            }
          ),
          hasMore && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              className: "min-w-[160px]",
              onClick: () => setVisibleCount((n) => n + LOAD_MORE_STEP),
              "data-ocid": "search.load_more_button",
              children: [
                "Load more (",
                total - visibleCount,
                " remaining)"
              ]
            }
          ) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open: showMobileFilters, onOpenChange: setShowMobileFilters, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      SheetContent,
      {
        side: "bottom",
        className: "max-h-[85vh] overflow-y-auto rounded-t-2xl",
        "data-ocid": "search.mobile_filter_sheet",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SheetHeader, { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { children: "Filters" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FilterPanel,
            {
              filters: draftFilters,
              onChange: setDraftFilters,
              onApply: () => applyFilters(draftFilters, true),
              onReset: resetFilters
            }
          )
        ]
      }
    ) })
  ] });
}
export {
  SearchPage
};
