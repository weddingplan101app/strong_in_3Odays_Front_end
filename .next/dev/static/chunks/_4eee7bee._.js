(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/ui/card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card,
    "CardAction",
    ()=>CardAction,
    "CardContent",
    ()=>CardContent,
    "CardDescription",
    ()=>CardDescription,
    "CardFooter",
    ()=>CardFooter,
    "CardHeader",
    ()=>CardHeader,
    "CardTitle",
    ()=>CardTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
;
function Card({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Card;
function CardHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c1 = CardHeader;
function CardTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('leading-none font-semibold', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_c2 = CardTitle;
function CardDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-muted-foreground text-sm', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_c3 = CardDescription;
function CardAction({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-action",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
_c4 = CardAction;
function CardContent({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-content",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('px-6', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
_c5 = CardContent;
function CardFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex items-center px-6 [.border-t]:pt-6', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
_c6 = CardFooter;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "Card");
__turbopack_context__.k.register(_c1, "CardHeader");
__turbopack_context__.k.register(_c2, "CardTitle");
__turbopack_context__.k.register(_c3, "CardDescription");
__turbopack_context__.k.register(_c4, "CardAction");
__turbopack_context__.k.register(_c5, "CardContent");
__turbopack_context__.k.register(_c6, "CardFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/dashboard/video/[id]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardVideoPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
// Mock video database
const videoDatabase = {
    // Beginner Men
    bm1: {
        id: "bm1",
        title: "Full Body Warmup",
        duration: "0:30",
        views: "1.2K",
        likes: 45,
        category: "Beginner - Men",
        instructor: "Mike Anderson",
        instructorAvatar: "/placeholder.svg?height=40&width=40",
        difficulty: "Beginner",
        rating: 4.8,
        description: "Start your fitness journey with this beginner-friendly full body warmup. Perfect for preparing your muscles and joints for more intense workouts.",
        thumbnail: "/man-doing-warmup-exercises.jpg",
        sections: [
            {
                title: "Neck and Shoulder Rolls",
                time: "2:15"
            },
            {
                title: "Arm Circles and Swings",
                time: "4:30"
            },
            {
                title: "Hip Rotations",
                time: "6:45"
            },
            {
                title: "Leg Swings and Lunges",
                time: "9:00"
            }
        ]
    },
    bm2: {
        id: "bm2",
        title: "Upper Body Basics",
        duration: "0:30",
        views: "980",
        likes: 38,
        category: "Beginner - Men",
        instructor: "Mike Anderson",
        instructorAvatar: "/placeholder.svg?height=40&width=40",
        difficulty: "Beginner",
        rating: 4.6,
        description: "Learn the fundamental upper body exercises to build strength in your chest, shoulders, and arms.",
        thumbnail: "/man-doing-push-ups.jpg",
        sections: [
            {
                title: "Push-up Basics",
                time: "3:20"
            },
            {
                title: "Plank Holds",
                time: "6:15"
            },
            {
                title: "Shoulder Taps",
                time: "8:45"
            },
            {
                title: "Cool Down Stretch",
                time: "11:30"
            }
        ]
    },
    bm3: {
        id: "bm3",
        title: "Lower Body Foundation",
        duration: "0:30",
        views: "1.5K",
        likes: 52,
        category: "Beginner - Men",
        instructor: "Mike Anderson",
        instructorAvatar: "/placeholder.svg?height=40&width=40",
        difficulty: "Beginner",
        rating: 4.9,
        description: "Build a strong foundation with essential lower body exercises for legs and glutes.",
        thumbnail: "/man-doing-squats.jpg",
        sections: [
            {
                title: "Bodyweight Squats",
                time: "4:10"
            },
            {
                title: "Reverse Lunges",
                time: "7:25"
            },
            {
                title: "Glute Bridges",
                time: "10:15"
            },
            {
                title: "Calf Raises",
                time: "12:40"
            }
        ]
    },
    bm4: {
        id: "bm4",
        title: "Core Strength",
        duration: "0:30",
        views: "1.1K",
        likes: 41,
        category: "Beginner - Men",
        instructor: "Mike Anderson",
        instructorAvatar: "/placeholder.svg?height=40&width=40",
        difficulty: "Beginner",
        rating: 4.7,
        description: "Develop core stability and strength with these beginner-friendly exercises.",
        thumbnail: "/man-doing-plank.jpg",
        sections: [
            {
                title: "Basic Plank Hold",
                time: "2:45"
            },
            {
                title: "Dead Bugs",
                time: "5:30"
            },
            {
                title: "Bird Dogs",
                time: "8:10"
            },
            {
                title: "Mountain Climbers",
                time: "10:55"
            }
        ]
    },
    bm5: {
        id: "bm5",
        title: "Cardio Basics",
        duration: "0:30",
        views: "890",
        likes: 35,
        category: "Beginner - Men",
        instructor: "Mike Anderson",
        instructorAvatar: "/placeholder.svg?height=40&width=40",
        difficulty: "Beginner",
        rating: 4.5,
        description: "Get your heart rate up with simple cardio exercises perfect for beginners.",
        thumbnail: "/man-doing-jumping-jacks.jpg",
        sections: [
            {
                title: "Jumping Jacks Warmup",
                time: "3:05"
            },
            {
                title: "High Knees",
                time: "6:20"
            },
            {
                title: "Butt Kicks",
                time: "8:45"
            },
            {
                title: "Cool Down March",
                time: "11:15"
            }
        ]
    },
    bm6: {
        id: "bm6",
        title: "Full Body Circuit",
        duration: "0:30",
        views: "1.3K",
        likes: 48,
        category: "Beginner - Men",
        instructor: "Mike Anderson",
        instructorAvatar: "/placeholder.svg?height=40&width=40",
        difficulty: "Intermediate",
        rating: 4.8,
        description: "Combine everything you've learned in this full body circuit workout.",
        thumbnail: "/man-doing-burpees.jpg",
        sections: [
            {
                title: "Dynamic Warmup",
                time: "3:30"
            },
            {
                title: "Upper Body Circuit",
                time: "8:15"
            },
            {
                title: "Lower Body Circuit",
                time: "13:40"
            },
            {
                title: "Finisher and Stretch",
                time: "17:20"
            }
        ]
    },
    // Beginner Women
    bw1: {
        id: "bw1",
        title: "Full Body Warmup",
        duration: "0:30",
        views: "2.1K",
        likes: 78,
        category: "Beginner - Women",
        instructor: "Emma Wilson",
        instructorAvatar: "/placeholder.svg?height=40&width=40",
        difficulty: "Beginner",
        rating: 4.9,
        description: "Gentle warmup exercises designed specifically for women starting their fitness journey.",
        thumbnail: "/woman-doing-warmup-exercises.jpg",
        sections: [
            {
                title: "Gentle Neck Stretches",
                time: "2:00"
            },
            {
                title: "Shoulder Mobility",
                time: "4:20"
            },
            {
                title: "Hip Openers",
                time: "6:50"
            },
            {
                title: "Ankle and Wrist Prep",
                time: "9:10"
            }
        ]
    },
    bw2: {
        id: "bw2",
        title: "Upper Body Basics",
        duration: "0:30",
        views: "1.8K",
        likes: 65,
        category: "Beginner - Women",
        instructor: "Emma Wilson",
        instructorAvatar: "/placeholder.svg?height=40&width=40",
        difficulty: "Beginner",
        rating: 4.7,
        description: "Build upper body strength with these beginner-friendly exercises.",
        thumbnail: "/woman-doing-push-ups.jpg",
        sections: [
            {
                title: "Wall Push-ups",
                time: "2:40"
            },
            {
                title: "Incline Push-ups",
                time: "5:15"
            },
            {
                title: "Tricep Dips",
                time: "7:50"
            },
            {
                title: "Upper Body Stretch",
                time: "10:20"
            }
        ]
    },
    bw3: {
        id: "bw3",
        title: "Lower Body Foundation",
        duration: "0:30",
        views: "2.4K",
        likes: 89,
        category: "Beginner - Women",
        instructor: "Emma Wilson",
        instructorAvatar: "/placeholder.svg?height=40&width=40",
        difficulty: "Beginner",
        rating: 5.0,
        description: "Tone and strengthen your legs and glutes with these essential exercises.",
        thumbnail: "/woman-doing-squats.jpg",
        sections: [
            {
                title: "Sumo Squats",
                time: "3:15"
            },
            {
                title: "Curtsy Lunges",
                time: "6:40"
            },
            {
                title: "Single-Leg Bridges",
                time: "9:25"
            },
            {
                title: "Inner Thigh Work",
                time: "12:10"
            }
        ]
    },
    bw4: {
        id: "bw4",
        title: "Core Strength",
        duration: "0:30",
        views: "1.9K",
        likes: 71,
        category: "Beginner - Women",
        instructor: "Emma Wilson",
        instructorAvatar: "/placeholder.svg?height=40&width=40",
        difficulty: "Beginner",
        rating: 4.8,
        description: "Strengthen your core with exercises designed for optimal results.",
        thumbnail: "/woman-doing-plank.jpg",
        sections: [
            {
                title: "Modified Plank",
                time: "2:30"
            },
            {
                title: "Pelvic Tilts",
                time: "5:00"
            },
            {
                title: "Leg Raises",
                time: "7:35"
            },
            {
                title: "Side Plank Prep",
                time: "10:05"
            }
        ]
    },
    bw5: {
        id: "bw5",
        title: "Cardio Basics",
        duration: "0:30",
        views: "1.6K",
        likes: 58,
        category: "Beginner - Women",
        instructor: "Emma Wilson",
        instructorAvatar: "/placeholder.svg?height=40&width=40",
        difficulty: "Beginner",
        rating: 4.6,
        description: "Energizing cardio workout perfect for beginners.",
        thumbnail: "/woman-doing-jumping-jacks.jpg",
        sections: [
            {
                title: "Light Cardio Warmup",
                time: "2:50"
            },
            {
                title: "Step Touches",
                time: "5:30"
            },
            {
                title: "Grapevines",
                time: "8:00"
            },
            {
                title: "Cool Down Walk",
                time: "10:40"
            }
        ]
    },
    bw6: {
        id: "bw6",
        title: "Full Body Circuit",
        duration: "0:30",
        views: "2.2K",
        likes: 82,
        category: "Beginner - Women",
        instructor: "Emma Wilson",
        instructorAvatar: "/placeholder.svg?height=40&width=40",
        difficulty: "Intermediate",
        rating: 4.9,
        description: "Complete full body workout combining all the basics you've mastered.",
        thumbnail: "/woman-doing-burpees.jpg",
        sections: [
            {
                title: "Full Body Warmup",
                time: "3:00"
            },
            {
                title: "Upper Body Intervals",
                time: "7:45"
            },
            {
                title: "Lower Body Intervals",
                time: "12:30"
            },
            {
                title: "Core Finisher",
                time: "16:15"
            }
        ]
    },
    // Equipment Men
    em1: {
        id: "em1",
        title: "Dumbbell Chest Press",
        duration: "0:30",
        views: "1.8K",
        likes: 67,
        category: "Equipment - Men",
        instructor: "Jason Martinez",
        instructorAvatar: "/placeholder.svg?height=40&width=40",
        difficulty: "Intermediate",
        rating: 4.7,
        description: "Build chest strength with proper dumbbell chest press technique.",
        thumbnail: "/man-dumbbell-chest-press.jpg",
        sections: [
            {
                title: "Setup and Form",
                time: "2:20"
            },
            {
                title: "Standard Chest Press",
                time: "5:40"
            },
            {
                title: "Incline Variation",
                time: "8:30"
            },
            {
                title: "Chest Stretch",
                time: "11:00"
            }
        ]
    },
    em2: {
        id: "em2",
        title: "Dumbbell Rows",
        duration: "0:30",
        views: "1.5K",
        likes: 55,
        category: "Equipment - Men",
        instructor: "Jason Martinez",
        instructorAvatar: "/placeholder.svg?height=40&width=40",
        difficulty: "Intermediate",
        rating: 4.6,
        description: "Strengthen your back with dumbbell rows for a balanced upper body.",
        thumbnail: "/man-dumbbell-rows.jpg",
        sections: [
            {
                title: "Bent-Over Row Setup",
                time: "2:10"
            },
            {
                title: "Single-Arm Rows",
                time: "5:25"
            },
            {
                title: "Both Arms Together",
                time: "8:15"
            },
            {
                title: "Back Stretch",
                time: "10:45"
            }
        ]
    },
    em3: {
        id: "em3",
        title: "Dumbbell Shoulder Press",
        duration: "0:30",
        views: "1.3K",
        likes: 48,
        category: "Equipment - Men",
        instructor: "Jason Martinez",
        instructorAvatar: "/placeholder.svg?height=40&width=40",
        difficulty: "Intermediate",
        rating: 4.5,
        description: "Build strong shoulders with this effective pressing movement.",
        thumbnail: "/man-shoulder-press.jpg",
        sections: [
            {
                title: "Shoulder Warmup",
                time: "1:50"
            },
            {
                title: "Seated Press",
                time: "4:30"
            },
            {
                title: "Standing Press",
                time: "7:20"
            },
            {
                title: "Shoulder Mobility",
                time: "9:50"
            }
        ]
    },
    em4: {
        id: "em4",
        title: "Dumbbell Squats",
        duration: "0:30",
        views: "2.1K",
        likes: 78,
        category: "Equipment - Men",
        instructor: "Jason Martinez",
        instructorAvatar: "/placeholder.svg?height=40&width=40",
        difficulty: "Intermediate",
        rating: 4.8,
        description: "Add resistance to your squats for maximum leg development.",
        thumbnail: "/placeholder.svg?height=400&width=700",
        sections: [
            {
                title: "Goblet Squat Form",
                time: "3:00"
            },
            {
                title: "Dumbbell Front Squat",
                time: "6:15"
            },
            {
                title: "Dumbbell Back Squat",
                time: "9:30"
            },
            {
                title: "Leg Stretch",
                time: "12:00"
            }
        ]
    },
    em5: {
        id: "em5",
        title: "Dumbbell Lunges",
        duration: "0:30",
        views: "1.7K",
        likes: 63,
        category: "Equipment - Men",
        instructor: "Jason Martinez",
        instructorAvatar: "/placeholder.svg?height=40&width=40",
        difficulty: "Intermediate",
        rating: 4.7,
        description: "Challenge your legs and balance with weighted lunges.",
        thumbnail: "/placeholder.svg?height=400&width=700",
        sections: [
            {
                title: "Reverse Lunge",
                time: "2:45"
            },
            {
                title: "Forward Lunge",
                time: "5:50"
            },
            {
                title: "Walking Lunges",
                time: "8:35"
            },
            {
                title: "Hip Flexor Stretch",
                time: "11:10"
            }
        ]
    },
    em6: {
        id: "em6",
        title: "Dumbbell Bicep Curls",
        duration: "0:30",
        views: "1.9K",
        likes: 71,
        category: "Equipment - Men",
        instructor: "Jason Martinez",
        instructorAvatar: "/placeholder.svg?height=40&width=40",
        difficulty: "Intermediate",
        rating: 4.6,
        description: "Build bigger arms with proper bicep curl form.",
        thumbnail: "/placeholder.svg?height=400&width=700",
        sections: [
            {
                title: "Standard Curl",
                time: "2:30"
            },
            {
                title: "Hammer Curls",
                time: "5:15"
            },
            {
                title: "Alternating Curls",
                time: "7:45"
            },
            {
                title: "Arm Stretch",
                time: "10:20"
            }
        ]
    },
    // Equipment Women
    ew1: {
        id: "ew1",
        title: "Dumbbell Chest Press",
        duration: "0:30",
        views: "2.3K",
        likes: 85,
        category: "Equipment - Women",
        instructor: "Sarah Chen",
        instructorAvatar: "/placeholder.svg?height=40&width=40",
        difficulty: "Intermediate",
        rating: 4.8,
        description: "Tone your chest and arms with dumbbell chest press.",
        thumbnail: "/placeholder.svg?height=400&width=700",
        sections: [
            {
                title: "Bench Setup",
                time: "2:10"
            },
            {
                title: "Flat Chest Press",
                time: "5:20"
            },
            {
                title: "Chest Fly",
                time: "8:15"
            },
            {
                title: "Upper Body Cool Down",
                time: "10:50"
            }
        ]
    },
    ew2: {
        id: "ew2",
        title: "Dumbbell Rows",
        duration: "0:30",
        views: "2.0K",
        likes: 74,
        category: "Equipment - Women",
        instructor: "Sarah Chen",
        instructorAvatar: "/placeholder.svg?height=40&width=40",
        difficulty: "Intermediate",
        rating: 4.7,
        description: "Sculpt your back with this essential rowing movement.",
        thumbnail: "/placeholder.svg?height=400&width=700",
        sections: [
            {
                title: "Form Check",
                time: "1:55"
            },
            {
                title: "Single-Arm Rows",
                time: "4:40"
            },
            {
                title: "Upright Rows",
                time: "7:25"
            },
            {
                title: "Back Stretch",
                time: "10:00"
            }
        ]
    },
    ew3: {
        id: "ew3",
        title: "Dumbbell Shoulder Press",
        duration: "0:30",
        views: "1.8K",
        likes: 66,
        category: "Equipment - Women",
        instructor: "Sarah Chen",
        instructorAvatar: "/placeholder.svg?height=40&width=40",
        difficulty: "Intermediate",
        rating: 4.6,
        description: "Create beautiful shoulder definition with overhead pressing.",
        thumbnail: "/placeholder.svg?height=400&width=700",
        sections: [
            {
                title: "Shoulder Activation",
                time: "2:05"
            },
            {
                title: "Seated Overhead Press",
                time: "4:50"
            },
            {
                title: "Arnold Press",
                time: "7:30"
            },
            {
                title: "Shoulder Stretch",
                time: "9:55"
            }
        ]
    },
    ew4: {
        id: "ew4",
        title: "Dumbbell Squats",
        duration: "0:30",
        views: "2.7K",
        likes: 98,
        category: "Equipment - Women",
        instructor: "Sarah Chen",
        instructorAvatar: "/placeholder.svg?height=40&width=40",
        difficulty: "Intermediate",
        rating: 4.9,
        description: "Build strong, toned legs with weighted squats.",
        thumbnail: "/placeholder.svg?height=400&width=700",
        sections: [
            {
                title: "Goblet Squat",
                time: "2:55"
            },
            {
                title: "Sumo Squat",
                time: "6:10"
            },
            {
                title: "Pulse Squats",
                time: "8:45"
            },
            {
                title: "Lower Body Stretch",
                time: "11:20"
            }
        ]
    },
    ew5: {
        id: "ew5",
        title: "Dumbbell Lunges",
        duration: "0:30",
        views: "2.2K",
        likes: 81,
        category: "Equipment - Women",
        instructor: "Sarah Chen",
        instructorAvatar: "/placeholder.svg?height=40&width=40",
        difficulty: "Intermediate",
        rating: 4.7,
        description: "Shape your legs and glutes with this effective lunge variation.",
        thumbnail: "/placeholder.svg?height=400&width=700",
        sections: [
            {
                title: "Stationary Lunges",
                time: "2:40"
            },
            {
                title: "Curtsy Lunges",
                time: "5:55"
            },
            {
                title: "Walking Lunges",
                time: "8:40"
            },
            {
                title: "Hip and Leg Stretch",
                time: "11:05"
            }
        ]
    },
    ew6: {
        id: "ew6",
        title: "Dumbbell Bicep Curls",
        duration: "0:30",
        views: "2.4K",
        likes: 89,
        category: "Equipment - Women",
        instructor: "Sarah Chen",
        instructorAvatar: "/placeholder.svg?height=40&width=40",
        difficulty: "Intermediate",
        rating: 4.8,
        description: "Tone your arms with proper bicep curl technique.",
        thumbnail: "/placeholder.svg?height=400&width=700",
        sections: [
            {
                title: "Basic Curl Form",
                time: "2:20"
            },
            {
                title: "Concentration Curls",
                time: "5:05"
            },
            {
                title: "Hammer Curls",
                time: "7:40"
            },
            {
                title: "Arm Stretch",
                time: "10:15"
            }
        ]
    }
};
function DashboardVideoClient({ video }) {
    _s();
    const [liked, setLiked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-7xl mx-auto space-y-6 pb-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: "/dashboard/beginner",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    variant: "ghost",
                    size: "sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                            className: "w-4 h-4 mr-2"
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/video/[id]/page.tsx",
                            lineNumber: 506,
                            columnNumber: 11
                        }, this),
                        "Back"
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/dashboard/video/[id]/page.tsx",
                    lineNumber: 505,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/dashboard/video/[id]/page.tsx",
                lineNumber: 504,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid lg:grid-cols-1 gap-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                            className: "overflow-hidden border-0 shadow-lg",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative aspect-video bg-black",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                    className: "w-full h-full",
                                    controls: true,
                                    poster: video.thumbnail,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("source", {
                                        src: video.thumbnail,
                                        type: "video/mp4"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/video/[id]/page.tsx",
                                        lineNumber: 518,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/video/[id]/page.tsx",
                                    lineNumber: 517,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/video/[id]/page.tsx",
                                lineNumber: 516,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/video/[id]/page.tsx",
                            lineNumber: 515,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-2xl lg:text-3xl font-bold text-foreground",
                                    children: video.title
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/video/[id]/page.tsx",
                                    lineNumber: 525,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-10 h-10 rounded-full bg-muted overflow-hidden",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: video.instructorAvatar || "/placeholder.svg?height=40&width=40",
                                                alt: video.instructor,
                                                className: "w-full h-full object-cover"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/video/[id]/page.tsx",
                                                lineNumber: 529,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/video/[id]/page.tsx",
                                            lineNumber: 528,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-medium text-foreground",
                                            children: video.instructor
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/video/[id]/page.tsx",
                                            lineNumber: 535,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dashboard/video/[id]/page.tsx",
                                    lineNumber: 527,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-6 text-sm text-muted-foreground",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/video/[id]/page.tsx",
                                                    lineNumber: 540,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: video.views
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/video/[id]/page.tsx",
                                                    lineNumber: 541,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/dashboard/video/[id]/page.tsx",
                                            lineNumber: 539,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                                    className: `w-4 h-4 ${liked ? "fill-primary text-primary" : ""}`
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/video/[id]/page.tsx",
                                                    lineNumber: 544,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: liked ? Number(video.likes) + 1 : video.likes
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/video/[id]/page.tsx",
                                                    lineNumber: 545,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/dashboard/video/[id]/page.tsx",
                                            lineNumber: 543,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "ghost",
                                            size: "sm",
                                            onClick: ()=>setLiked(!liked),
                                            className: "h-auto p-0 hover:bg-transparent",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                                className: `w-5 h-5 ${liked ? "fill-primary text-primary" : ""}`
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/video/[id]/page.tsx",
                                                lineNumber: 553,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/video/[id]/page.tsx",
                                            lineNumber: 547,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dashboard/video/[id]/page.tsx",
                                    lineNumber: 538,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dashboard/video/[id]/page.tsx",
                            lineNumber: 524,
                            columnNumber: 11
                        }, this),
                        video.sections && video.sections.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3 pt-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-lg font-semibold text-foreground",
                                    children: "Workout Sections"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/video/[id]/page.tsx",
                                    lineNumber: 560,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-3",
                                    children: video.sections.map((section, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                            className: "p-4 hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-primary",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded",
                                                        children: section.time
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/video/[id]/page.tsx",
                                                        lineNumber: 568,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "font-medium text-sm text-foreground leading-snug",
                                                        children: section.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/video/[id]/page.tsx",
                                                        lineNumber: 571,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/video/[id]/page.tsx",
                                                lineNumber: 567,
                                                columnNumber: 21
                                            }, this)
                                        }, index, false, {
                                            fileName: "[project]/app/dashboard/video/[id]/page.tsx",
                                            lineNumber: 563,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/video/[id]/page.tsx",
                                    lineNumber: 561,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dashboard/video/[id]/page.tsx",
                            lineNumber: 559,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pt-4 space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-lg font-semibold text-foreground",
                                    children: "About this workout"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/video/[id]/page.tsx",
                                    lineNumber: 581,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-muted-foreground leading-relaxed",
                                    children: video.description
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/video/[id]/page.tsx",
                                    lineNumber: 582,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dashboard/video/[id]/page.tsx",
                            lineNumber: 580,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/dashboard/video/[id]/page.tsx",
                    lineNumber: 513,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/dashboard/video/[id]/page.tsx",
                lineNumber: 511,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/dashboard/video/[id]/page.tsx",
        lineNumber: 502,
        columnNumber: 5
    }, this);
}
_s(DashboardVideoClient, "5oFMLl0KA2P+7Df5hTCAaQ+yYE8=");
_c = DashboardVideoClient;
async function DashboardVideoPage({ params }) {
    const { id } = params;
    const video = videoDatabase[id] || videoDatabase["bm1"];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DashboardVideoClient, {
        video: video
    }, void 0, false, {
        fileName: "[project]/app/dashboard/video/[id]/page.tsx",
        lineNumber: 594,
        columnNumber: 10
    }, this);
}
_c1 = DashboardVideoPage;
var _c, _c1;
__turbopack_context__.k.register(_c, "DashboardVideoClient");
__turbopack_context__.k.register(_c1, "DashboardVideoPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>ArrowLeft
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const ArrowLeft = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("ArrowLeft", [
    [
        "path",
        {
            d: "m12 19-7-7 7-7",
            key: "1l729n"
        }
    ],
    [
        "path",
        {
            d: "M19 12H5",
            key: "x3x0zl"
        }
    ]
]);
;
 //# sourceMappingURL=arrow-left.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ArrowLeft",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Eye
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const Eye = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Eye", [
    [
        "path",
        {
            d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
            key: "1nclc0"
        }
    ],
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "3",
            key: "1v7zrd"
        }
    ]
]);
;
 //# sourceMappingURL=eye.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Eye",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Heart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const Heart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Heart", [
    [
        "path",
        {
            d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
            key: "c3ymky"
        }
    ]
]);
;
 //# sourceMappingURL=heart.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Heart",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_4eee7bee._.js.map