"use strict";
/**
 * THE TREE OF CAREER
 * Interaction layer for an SVG tree portfolio.
 *  - Roots  -> formative background statements
 *  - Branches -> personal qualities
 *  - Fruit  -> professional skills (fall from the branch when clicked)
 */
const CONTENT = {
    root1: {
        kind: "Root I — Origin",
        title: "First Verses",
        body: "Started to write poetry at the age of 9 — the first root, sunk early, that has been drawing up everything since.",
    },
    root2: {
        kind: "Root II — Origin",
        title: "The Space Between",
        body: "Had a near-death experience at the age of 21, the kind that quietly resets what a life is for.",
    },
    root3: {
        kind: "Root III — Origin",
        title: "An Offered Poem",
        body: "Met my idol, Rick Wakeman, and gave him my poem at the age of 39 — proof that the first root was still growing.",
    },
    branch1: {
        kind: "Branch I — Quality",
        title: "Conceptual Creative Thinker",
        body: "Comfortable holding an idea before it has a shape — building outward from a feeling, an image, or a question toward something whole.",
    },
    branch2: {
        kind: "Branch II — Quality",
        title: "Independent Worker",
        body: "Trusted to take a brief and run — self-directed, self-checked, and steady without someone standing over the work.",
    },
    branch3: {
        kind: "Branch III — Quality",
        title: "Curious Nature",
        body: "Drawn to the unfamiliar rather than away from it. Curiosity is the quiet engine behind most of what's on this tree.",
    },
    fruit1: {
        kind: "Fruit I — Skill",
        title: "Creative Writing",
        body: "Turning experience into language that lands — poetry first, but the instinct carries into any writing that needs a pulse.",
    },
    fruit2: {
        kind: "Fruit II — Skill",
        title: "Problem-Solving",
        body: "Finding the workable path through a tangle — patient with ambiguity, decisive once the shape of the problem is clear.",
    },
    fruit3: {
        kind: "Fruit III — Skill",
        title: "Efficiency",
        body: "Doing the necessary thing without the unnecessary motion. Respect for time — the reader's, the team's, and my own.",
    },
};
// Where each fruit should land relative to its own starting point,
// and how far it should rotate as it tumbles. Tuned by eye against the SVG layout.
const FALL_TARGETS = {
    fruit1: { dx: 56, dy: 292, rot: -300 },
    fruit2: { dx: 0, dy: 321, rot: 210 },
    fruit3: { dx: -56, dy: 292, rot: 300 },
};
const panel = document.getElementById("panel");
const panelKind = document.getElementById("panel-kind");
const panelTitle = document.getElementById("panel-title");
const panelBody = document.getElementById("panel-body");
const panelClose = document.getElementById("panel-close");
const panelReset = document.getElementById("panel-reset");
let activeFruitKey = null;
function openPanel(content, showReset) {
    panelKind.textContent = content.kind;
    panelTitle.textContent = content.title;
    panelBody.textContent = content.body;
    panelReset.hidden = !showReset;
    panel.classList.add("open");
}
function closePanel() {
    panel.classList.remove("open");
}
function clearActiveOfType(type) {
    document
        .querySelectorAll(`.node[data-type="${type}"].active`)
        .forEach((el) => el.classList.remove("active"));
    document
        .querySelectorAll(`.${type}-path.lit`)
        .forEach((el) => el.classList.remove("lit"));
}
function litPathFor(type, key) {
    // maps root1 -> root-path-1, branch2 -> branch-path-2
    const index = key.replace(/\D/g, "");
    const path = document.getElementById(`${type}-path-${index}`);
    if (path)
        path.classList.add("lit");
}
function handleRootOrBranchClick(node, type, key) {
    const alreadyActive = node.classList.contains("active");
    clearActiveOfType(type);
    if (alreadyActive) {
        closePanel();
        return;
    }
    node.classList.add("active");
    litPathFor(type, key);
    openPanel(CONTENT[key], false);
}
function dropFruit(unit, node, key) {
    if (unit.classList.contains("fallen")) {
        // already on the ground — just reopen the panel
        openPanel(CONTENT[key], true);
        return;
    }
    const target = FALL_TARGETS[key];
    node.style.setProperty("--dx", `${target.dx}px`);
    node.style.setProperty("--dy", `${target.dy}px`);
    node.style.setProperty("--rot", `${target.rot}deg`);
    unit.classList.add("settling");
    unit.classList.add("fallen");
    activeFruitKey = key;
    const onDone = () => {
        unit.classList.remove("settling");
        node.removeEventListener("animationend", onDone);
        openPanel(CONTENT[key], true);
    };
    node.addEventListener("animationend", onDone);
}
function resetFruit() {
    if (!activeFruitKey)
        return;
    const unit = document.getElementById(`fruit-unit-${activeFruitKey.replace(/\D/g, "")}`);
    if (unit) {
        unit.classList.remove("fallen");
        const node = unit.querySelector(".fruit-node");
        node?.style.removeProperty("--dx");
        node?.style.removeProperty("--dy");
        node?.style.removeProperty("--rot");
    }
    closePanel();
    activeFruitKey = null;
}
function init() {
    const nodes = document.querySelectorAll(".node");
    nodes.forEach((node) => {
        const type = node.dataset.type;
        const key = node.dataset.key;
        if (!type || !key)
            return;
        const activate = () => {
            if (type === "fruit") {
                const unit = node.closest(".fruit-unit");
                if (unit)
                    dropFruit(unit, node, key);
            }
            else {
                handleRootOrBranchClick(node, type, key);
            }
        };
        node.addEventListener("click", activate);
        node.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                activate();
            }
        });
    });
    panelClose.addEventListener("click", closePanel);
    panelReset.addEventListener("click", resetFruit);
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape")
            closePanel();
    });
}
document.addEventListener("DOMContentLoaded", init);
//# sourceMappingURL=main.js.map