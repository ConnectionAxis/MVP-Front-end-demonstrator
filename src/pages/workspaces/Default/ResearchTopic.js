import React, { Component } from "react";
import CNavButton from "../../../elements/CNavButton.js";
import ConAxLogo from "../../../elements/ConAxLogo.js";
import CAvatar from "../../../elements/CAvatar.js";
import DataManager from "../../../utils/DataManager.js";
import Util from "../../../utils/Util.js";
import PopoverStickOnHover from "../../../utils/PopoverStickOnHover.js";
import Dropdown from "react-bootstrap/Dropdown";
import format from "string-format";
import { NavLink } from "react-router-dom";

export default class ResearchTopic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      full: false,
    };

    this.showMore = this.showMore.bind(this);
    this.handleAction = this.handleAction.bind(this);
  }

  showMore(e, value) {
    e.preventDefault();

    this.setState({ full: value }, () => {
      let views = this.state.data.views;
      this.setData({ views: ++views });
    });
  }

  handleAction(e, action) {
    e.preventDefault();
    console.log("[ResearchTopic:handleAction]", action, this.state.data.id);
    switch (action) {
      case "upvote":
        let upvotes = this.state.data.upvotes;
        this.setData({ upvotes: ++upvotes });
        break;
      default:
        if (typeof this.props.onAction === "function") {
          this.props.onAction(action, this.state.data);
        }
    }
  }

  setAvatarPrimary(src) {
    if (!Util.isEmpty(src)) {
      return (
        <CAvatar width="100" height="100" file={src} alt={this.state.data.id} />
      );
    } else {
      return <ConAxLogo type="logo" width="100" />;
    }
  }

  setAvatarSecondary(src) {
    if (!Util.isEmpty(src)) {
      return (
        <CAvatar width="40" height="40" file={src} alt={this.state.data.id} />
      );
    } else {
      return <ConAxLogo type="logo" width="40" />;
    }
  }

  setData(data) {
    let state = this.state.data;
    Util.eachInObject(data, (key, value) => {
      if (state.hasOwnProperty(key)) state[key] = value;
    });
    this.setState({ data: state });

    DataManager.updateObject("research_topics", state.id, data);
  }

  getDate(dt) {
    return format("{0} days ago", Util.getDaysAgo(dt));
  }

  render() {
    const t = this.state.data;
    return (
      <div className="border px-3 pt-2 pb-3 mt-1 mb-3">
        <div className="d-flex align-items-center pt-1 pb-2">
          <div>{this.setAvatarPrimary(t.image_profile)}</div>
          <div className="flex-fill pl-3">
            <h3 className="h5 font-600 my-0">{t.author.name}</h3>
            <p className="mb-0">
              <PopoverStickOnHover
                placement="bottom"
                className="popover-wide"
                content={
                  <>
                    <div className="d-flex mt-1">
                      <div>{this.setAvatarSecondary(t.image_author)}</div>
                      <div className="flex-fill pl-2">
                        <h5 className="h5 font-600 my-0">
                          {t.author.organization}
                        </h5>
                        <p className="p-s mt-1 mb-1">{t.author.desc}</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href={"#add-" + t.id} className="c-link font-600">
                        Add to my Research Networks
                      </a>
                    </div>
                    <div className="border-top mt-2 pt-2">
                      <div className="d-flex text-center">
                        <div className="flex-grow-1">
                          <p className="p-s mb-0">Connections</p>
                          <span className="h6 font-600 mb-1">
                            {Util.getNumbers()}
                          </span>
                        </div>
                        <div className="flex-grow-1">
                          <p className="p-s mb-0">Integrations</p>
                          <span className="h6 font-600 mb-1">
                            {Util.getNumbers()}
                          </span>
                        </div>
                        <div className="flex-grow-1">
                          <p className="p-s mb-0">Views</p>
                          <span className="h6 font-600 mb-1">
                            {Util.getNumbers()}
                          </span>
                        </div>
                        <div className="flex-grow-1">
                          <p className="p-s mb-0">Contributors</p>
                          <span className="h6 font-600 mb-1">
                            {Util.getNumbers()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                }
              >
                <span className="text-curious-blue c-link">
                  {t.author.organization}{" "}
                </span>
              </PopoverStickOnHover>
              - {t.author.type} - {this.getDate(t.created)}
            </p>
            <div>
              <PopoverStickOnHover
                placement="bottom"
                className="popover-wide"
                content={
                  <>
                    {t.frameworks.map((f, i) => (
                      <p className="my-1" key={i}>
                        <NavLink
                          className="c-link"
                          to={"/framework?id=" + f.ref}
                        >
                          {f.title}
                        </NavLink>
                      </p>
                    ))}
                  </>
                }
              >
                <span className="text-curious-blue font-600 c-link mr-3">
                  Frameworks {t.frameworks.length}
                </span>
              </PopoverStickOnHover>
            </div>
          </div>
        </div>
        <h4 className="h5 font-600">
          <NavLink to={"/research?id=" + t.id} className="c-link">
            {t.title}
          </NavLink>
        </h4>
        <p className="mb-1">
          {t.caption}{" "}
          {!this.state.full && (
            <a
              href="#show"
              className="text-curious-blue c-link"
              onClick={(e) => this.showMore(e, true)}
            >
              Show more
            </a>
          )}
        </p>
        {this.state.full && (
          <p>
            {t.caption_full}{" "}
            <a
              href="#show"
              className="text-curious-blue c-link"
              onClick={(e) => this.showMore(e, false)}
            >
              Show less
            </a>
          </p>
        )}
        <div>
          <PopoverStickOnHover
            placement="bottom"
            className="popover-wide"
            content={
              <>
                <p className="mb-2">
                  <span className="font-600">Categories</span>:
                  {t.categories.split(",").map((c, i) => (
                    <span className="mx-1 text-curious-blue c-link" key={i}>
                      {c.trim()}
                    </span>
                  ))}
                </p>
                <p className="mb-2">
                  <span className="font-600">Topics</span>:
                  {t.topics.split(",").map((t, i) => (
                    <span className="mx-1 text-curious-blue c-link" key={i}>
                      {t.trim()}
                    </span>
                  ))}
                </p>
              </>
            }
          >
            <span className="text-curious-blue font-600 c-link">
              Categories & Topics
            </span>
          </PopoverStickOnHover>
        </div>
        <div>
          <span className="p-s mr-2">{t.upvotes} upvotes</span>
          <span className="p-s">{t.views} views</span>
        </div>
        <div className="d-flex no-gutters align-items-center mt-2">
          <div className="flex-fill">
            <div className="form-group mb-0">
              <input
                type="text"
                placeholder="Add comment"
                className="form-control"
              />
            </div>
          </div>
          <div>
            <Dropdown className="conax-nav-dropdown">
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <CNavButton
                  type="circle"
                  icon="dots"
                  className="ml-2"
                  button={false}
                />
              </Dropdown.Toggle>
              <Dropdown.Menu
                alignRight
                className="mt-2 py-0"
                style={{ minWidth: "250px", maxWidth: "300px" }}
              >
                <Dropdown.Item
                  className="text-curious-blue px-3 border-bottom d-block"
                  href={"/research?id=" + t.id}
                >
                  Get in
                </Dropdown.Item>
                <Dropdown.Item
                  className="text-curious-blue px-3 border-bottom d-block"
                  href="#newframework"
                  onClick={(e) => this.handleAction(e, "newframework")}
                >
                  Edit new Framework
                </Dropdown.Item>
                <Dropdown.Item
                  className="text-curious-blue px-3 border-bottom d-block"
                  href="#targeting&analytics"
                  onClick={(e) => this.handleAction(e, "targeting&analytics")}
                >
                  View Targeting & Analytics
                </Dropdown.Item>
                <Dropdown.Item
                  className="text-curious-blue px-3 border-bottom d-block"
                  href="#upvote"
                  onClick={(e) => this.handleAction(e, "upvote")}
                >
                  Upvote
                </Dropdown.Item>
                <Dropdown.Item
                  className="text-curious-blue px-3 border-bottom d-block"
                  href="#share"
                  onClick={(e) => this.handleAction(e, "share")}
                >
                  Share
                </Dropdown.Item>
                <Dropdown.Item
                  className="text-curious-blue px-3 border-bottom d-block"
                  href="#notify"
                  onClick={(e) => this.handleAction(e, "notify")}
                >
                  Notify about edits
                </Dropdown.Item>
                <Dropdown.Item
                  className="text-curious-blue px-3 border-bottom d-block"
                  href="#report"
                  onClick={(e) => this.handleAction(e, "report")}
                >
                  Report
                </Dropdown.Item>
                <Dropdown.Item
                  className="px-3 border-bottom d-block"
                  href="#guidelines"
                  onClick={(e) => this.handleAction(e, "guidelines")}
                  style={{ whiteSpace: "inherit", fontSize: "0.8rem" }}
                >
                  This goes against{" "}
                  <span className="c-link text-curious-blue">ConAx</span>{" "}
                  community guidelines
                </Dropdown.Item>
                {t.inspired.map((inspire, i) => {
                  let collection = "";
                  if (inspire.collection === "research")
                    collection = "Research space";
                  if (inspire.collection === "framework")
                    collection = "Framework";

                  return (
                    <Dropdown.Item
                      key={inspire.ref}
                      className="px-3 border-bottom d-block"
                      href={"/" + inspire.collection + "?id=" + inspire.ref}
                      style={{ whiteSpace: "inherit", fontSize: "0.8rem" }}
                    >
                      This Research space is inspired by your {collection} -{" "}
                      <NavLink
                        className="c-link"
                        to={"/" + inspire.collection + "?id=" + inspire.ref}
                      >
                        {inspire.title}
                      </NavLink>
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    );
  }
}
