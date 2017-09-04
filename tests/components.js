import React from "react";
import { shallow } from "enzyme";

import { Game } from "../src/components/Game";
import { Leaderboard } from "../src/components/Leaderboard";
import Score from "../src/components/Score";

describe("components", () => {
  describe("Game", () => {
    const wrapper = shallow(<Game />);

    it("should have all its subcomponents", () => {
      expect(wrapper.find("Title").exists()).toBe(true);
      expect(wrapper.find("Connect(Tileset)").exists()).toBe(true);
      expect(wrapper.find("ImageInput").exists()).toBe(true);
      expect(wrapper.find("ResetButton").exists()).toBe(true);
      expect(wrapper.find("Score").exists()).toBe(true);
      expect(wrapper.find("Connect(Leaderboard)").exists()).toBe(true);
      expect(wrapper.find("Connect(PromptScore)").exists()).toBe(true);
    });
  });

  describe("Leaderboard", () => {
    const wrapper = shallow(<Leaderboard />);
    const leaderboard = [
      { name: "a", moves: "1" },
      { name: "b", moves: "3" },
      { name: "c", moves: "5" },
      { name: "d", moves: "8" },
      { name: "e", moves: "12" },
    ];

    wrapper.setProps({ leaderboard });

    it("should have all the list items for each score", () => {
      for (let i = 0; i < leaderboard.length; i += 1) {
        expect(wrapper.find("li").at(i).text())
          .toEqual(`Name: ${leaderboard[i].name}, Moves: ${leaderboard[i].moves}`);
      }
    });
  });

  describe("Score", () => {
    const wrapper = shallow(<Score />);
    wrapper.setProps({ moves: 5 });

    it("should have the score displaying the current moves", () => {
      expect(wrapper.find("div").text()).toEqual("5 moves");
    });
  });
});
