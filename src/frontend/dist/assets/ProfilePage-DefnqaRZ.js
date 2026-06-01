import { c as createLucideIcon, u as useBackend, l as useAuth, b as useNavigate, o as useQueryClient, r as reactExports, d as useQuery, j as jsxRuntimeExports, U as User, B as Button, f as LoadingSkeleton, M as MapPin, I as Input, X, p as ue, E as ExternalBlob } from "./index-gsR6w5On.js";
import { A as Avatar, a as AvatarImage, b as AvatarFallback } from "./avatar-IQxayEtA.js";
import { L as Label, C as Check } from "./label-BFKrZYP4.js";
import { T as Textarea } from "./textarea-zztFCMmL.js";
import { u as useMutation } from "./useMutation-Bi8NVf3W.js";
import { P as Pen } from "./pen-BS3nWxLh.js";
import { C as Calendar } from "./calendar-Dp-QUm-L.js";
import "./index-T7DfQMot.js";
import "./index-DEJXbCLB.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const Phone = createLucideIcon("phone", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode);
function ProfilePage() {
  const { actor, isReady } = useBackend();
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [editing, setEditing] = reactExports.useState(false);
  const [avatarFile, setAvatarFile] = reactExports.useState(null);
  const [avatarPreview, setAvatarPreview] = reactExports.useState(null);
  const { data: profile, isLoading } = useQuery({
    queryKey: ["my-profile"],
    queryFn: async () => (actor == null ? void 0 : actor.getCallerUserProfile()) ?? null,
    enabled: isReady && isAuthenticated
  });
  const [name, setName] = reactExports.useState("");
  const [bio, setBio] = reactExports.useState("");
  const [location, setLocation] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const startEdit = () => {
    setName((profile == null ? void 0 : profile.name) ?? "");
    setBio((profile == null ? void 0 : profile.bio) ?? "");
    setLocation((profile == null ? void 0 : profile.location) ?? "");
    setPhone((profile == null ? void 0 : profile.phone) ?? "");
    setAvatarPreview((profile == null ? void 0 : profile.avatarUrl) ?? null);
    setAvatarFile(null);
    setEditing(true);
  };
  const cancelEdit = () => {
    setEditing(false);
    setAvatarFile(null);
    setAvatarPreview(null);
  };
  const handleAvatarChange = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };
  const completionFields = [
    profile == null ? void 0 : profile.name,
    profile == null ? void 0 : profile.bio,
    profile == null ? void 0 : profile.location,
    profile == null ? void 0 : profile.phone,
    profile == null ? void 0 : profile.avatarUrl
  ];
  const filledCount = completionFields.filter(Boolean).length;
  const completionPct = Math.round(
    filledCount / completionFields.length * 100
  );
  const memberDate = profile ? new Date(
    Number(profile.memberSince / BigInt(1e6))
  ).toLocaleDateString("en-IN", { month: "long", year: "numeric" }) : "";
  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      let avatarUrl = profile == null ? void 0 : profile.avatarUrl;
      if (avatarFile) {
        const bytes = new Uint8Array(await avatarFile.arrayBuffer());
        const blob = ExternalBlob.fromBytes(bytes);
        avatarUrl = blob.getDirectURL();
      }
      return actor.saveCallerUserProfile({
        name: name.trim(),
        bio: bio.trim() || void 0,
        location: location.trim() || void 0,
        phone: phone.trim() || void 0,
        avatarUrl
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["my-profile"] });
      setEditing(false);
      setAvatarFile(null);
      setAvatarPreview(null);
      ue.success("Profile saved!");
    },
    onError: () => ue.error("Failed to save profile.")
  });
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "mx-auto max-w-screen-sm px-4 py-16 text-center",
        "data-ocid": "profile.auth_required",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-10 w-10 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-3", children: "My Profile" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "Login to view and manage your profile." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: login, "data-ocid": "profile.login_button", children: "Login with Internet Identity" })
        ]
      }
    );
  }
  if (isLoading)
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-screen-md px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      LoadingSkeleton,
      {
        variant: "avatar",
        count: 3,
        className: "flex flex-col gap-4"
      }
    ) });
  const displayAvatar = profile == null ? void 0 : profile.avatarUrl;
  const initials = ((profile == null ? void 0 : profile.name) ?? "U").slice(0, 2).toUpperCase();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-screen-md px-4 py-8", "data-ocid": "profile.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card shadow-xs overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-full bg-gradient-to-r from-primary to-accent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-5 sm:flex-row sm:items-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-24 w-24 ring-4 ring-background shadow-md", children: [
            displayAvatar ? /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: displayAvatar, alt: profile == null ? void 0 : profile.name }) : null,
            /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "text-2xl font-bold bg-primary/15 text-primary", children: initials })
          ] }),
          !editing && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: startEdit,
              className: "absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md hover:bg-primary/90 transition-colors",
              "aria-label": "Edit profile",
              "data-ocid": "profile.quick_edit_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "h-3.5 w-3.5" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: !editing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: (profile == null ? void 0 : profile.name) ?? "Complete your profile" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground", children: [
                (profile == null ? void 0 : profile.location) && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5 text-primary" }),
                  profile.location
                ] }),
                (profile == null ? void 0 : profile.phone) && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-3.5 w-3.5 text-accent" }),
                  profile.phone
                ] }),
                memberDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" }),
                  "Member since ",
                  memberDate
                ] })
              ] }),
              (profile == null ? void 0 : profile.bio) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground leading-relaxed max-w-prose", children: profile.bio })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: startEdit,
                "data-ocid": "profile.edit_button",
                className: "flex-shrink-0",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "h-4 w-4 mr-1.5" }),
                  "Edit Profile"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-lg bg-muted/50 border border-border p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground", children: "Profile completion" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-primary", children: [
                completionPct,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-full overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500",
                style: { width: `${completionPct}%` },
                "data-ocid": "profile.completion_bar"
              }
            ) }),
            completionPct < 100 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1.5 text-xs text-muted-foreground", children: [
              "Add ",
              completionFields.length - filledCount,
              " more field",
              completionFields.length - filledCount !== 1 ? "s" : "",
              " ",
              "to complete your profile"
            ] })
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "form",
          {
            onSubmit: (e) => {
              e.preventDefault();
              saveMutation.mutate();
            },
            className: "flex flex-col gap-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-16 w-16 ring-2 ring-border", children: [
                  avatarPreview ? /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: avatarPreview, alt: "Preview" }) : displayAvatar ? /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: displayAvatar, alt: name }) : null,
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-primary/15 text-primary font-bold", children: name.slice(0, 2).toUpperCase() || initials })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Label,
                    {
                      htmlFor: "avatar-upload",
                      className: "cursor-pointer inline-flex items-center gap-1.5 rounded-md border border-input bg-background px-3 py-1.5 text-sm hover:bg-muted transition-colors",
                      "data-ocid": "profile.avatar_upload",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-3.5 w-3.5" }),
                        avatarFile ? "Change photo" : "Upload photo"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "avatar-upload",
                      type: "file",
                      accept: "image/*",
                      className: "sr-only",
                      onChange: handleAvatarChange
                    }
                  ),
                  avatarFile && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground truncate max-w-[160px]", children: avatarFile.name })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "pname", children: [
                  "Name ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "pname",
                    value: name,
                    onChange: (e) => setName(e.target.value),
                    "data-ocid": "profile.name_input",
                    placeholder: "Your full name",
                    required: true
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pbio", children: "Bio" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Textarea,
                  {
                    id: "pbio",
                    value: bio,
                    onChange: (e) => setBio(e.target.value),
                    rows: 3,
                    placeholder: "Tell buyers about yourself...",
                    "data-ocid": "profile.bio_textarea"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-3 sm:grid-cols-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ploc", children: "Location" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "ploc",
                      value: location,
                      onChange: (e) => setLocation(e.target.value),
                      placeholder: "City, State",
                      "data-ocid": "profile.location_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pphone", children: "Phone" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "pphone",
                      value: phone,
                      onChange: (e) => setPhone(e.target.value),
                      placeholder: "+91 98765 43210",
                      "data-ocid": "profile.phone_input"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "submit",
                    disabled: saveMutation.isPending || !name.trim(),
                    "data-ocid": "profile.save_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 mr-1.5" }),
                      saveMutation.isPending ? "Saving..." : "Save Changes"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    onClick: cancelEdit,
                    "data-ocid": "profile.cancel_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4 mr-1.5" }),
                      "Cancel"
                    ]
                  }
                )
              ] })
            ]
          }
        ) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold text-foreground", children: "My Listings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => navigate({ to: "/my-listings" }),
          "data-ocid": "profile.view_all_listings",
          children: "Manage listings"
        }
      )
    ] })
  ] });
}
export {
  ProfilePage
};
