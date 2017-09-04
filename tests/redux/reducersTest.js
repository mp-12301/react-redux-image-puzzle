import reducer from "../../src/reducers/reducer-game";
import { ACTION_TYPES } from "../../src/actions";

describe("game reducer", () => {
  const initialState = {
    dragging: -1,
    error: null,
    finished: false,
    grid: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    image: null,
    leaderboard: [],
    loaded: false,
    loading: false,
    moves: 0,
    place: -1,
  };

  it("should return the initial state.", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should handle GAME_LOADING.", () => {
    expect(
      reducer(undefined, {
        type: ACTION_TYPES.GAME_LOADING,
      }),
    ).toEqual({ ...initialState, loading: true, loaded: false });
  });

  it("should handle GAME_LOADED.", () => {
    expect(
      reducer(undefined, {
        type: ACTION_TYPES.GAME_LOADED,
        image: "foobar",
        grid: "foobar",
      }),
    ).toEqual({ ...initialState,
      image: "foobar",
      loaded: true,
      grid: "foobar",
      leaderboard: [],
      moves: 0,
      loading: false,
      dragging: false,
      finished: false,
    });
  });

  it("should handle GAME_RESET.", () => {
    expect(
      reducer(undefined, {
        type: ACTION_TYPES.GAME_LOADED,
        image: "foobar",
        grid: "foobar",
      }),
    ).toEqual({ ...initialState,
      image: "foobar",
      loaded: true,
      grid: "foobar",
      moves: 0,
      loading: false,
      dragging: false,
      finished: false,
    });
  });

  it("should handle GAME_FINISHED and determine first place correctly.", () => {
    const leaderboard = [{
      name: "Mr.Black",
      moves: 2,
    }, {
      name: "Mr.White",
      moves: 2,
    }, {
      name: "Mr.Orange",
      moves: 3,
    }, {
      name: "Mr.Red",
      moves: 4,
    }, {
      name: "Mr.Pink",
      moves: 6,
    }];
    expect(
      reducer({ ...initialState, leaderboard, moves: 1 }, {
        type: ACTION_TYPES.GAME_FINISHED,
      }),
    ).toEqual({ ...initialState,
      place: 0,
      moves: 1,
      leaderboard,
    });
  });

  it("should handle GAME_FINISHED and determine fifth place correctly.", () => {
    const leaderboard = [{
      name: "Mr.Black",
      moves: 2,
    }, {
      name: "Mr.White",
      moves: 2,
    }, {
      name: "Mr.Orange",
      moves: 3,
    }, {
      name: "Mr.Red",
      moves: 4,
    }, {
      name: "Mr.Pink",
      moves: 6,
    }];
    expect(
      reducer({ ...initialState, leaderboard, moves: 5 }, {
        type: ACTION_TYPES.GAME_FINISHED,
      }),
    ).toEqual({ ...initialState,
      place: 4,
      moves: 5,
      leaderboard,
    });
  });


  it("should handle UPDATE_LEADERBOARD and set winners" +
      "correctly in the leaderboard.", () => {
    const winners = [{
      name: "Mr.Void",
      moves: 5,
      place: 4,
    }, {
      name: "Mr.Oblivion",
      moves: 0,
      place: 0,
    }, {
      name: "Mr.Picky",
      moves: 2,
      place: 3,
    }];
    let expectedLeaderboard = [];
    let leaderboard = [{
      name: "Mr.Black",
      moves: 1,
    }, {
      name: "Mr.White",
      moves: 2,
    }, {
      name: "Mr.Orange",
      moves: 3,
    }, {
      name: "Mr.Red",
      moves: 4,
    }, {
      name: "Mr.Pink",
      moves: 6,
    }];
    for (let i = 0; i < winners.length; i += 1) {
      expectedLeaderboard = leaderboard.slice(0, 5);
      expectedLeaderboard.splice(
        winners[i].place, 0,
        { name: winners[i].name, moves: winners[i].moves });
      expectedLeaderboard = expectedLeaderboard.slice(0, 5);
      expect(
        reducer({ ...initialState, leaderboard }, {
          type: ACTION_TYPES.UPDATE_LEADERBOARD,
          ...winners[i],
        }),
      ).toEqual({ ...initialState,
        leaderboard: expectedLeaderboard,
      });
      leaderboard = expectedLeaderboard;
    }
  });

  it("should handle PLAYER_DRAG.", () => {
    expect(
      reducer(undefined, {
        type: ACTION_TYPES.PLAYER_DRAG,
        index: 1,
      }),
    ).toEqual({ ...initialState,
      dragging: 1,
    });
  });

  it("should handle PLAYER_DROP and swap elements in the grid correctly.", () => {
    expect(
      reducer({ ...initialState, dragging: 1 }, {
        type: ACTION_TYPES.PLAYER_DROP,
        index: 5,
      }),
    ).toEqual({ ...initialState,
      dragging: false,
      grid: [0, 5, 2, 3, 4, 1, 6, 7, 8],
      moves: 1,
    });
  });

  it("should handle PLAYER_DROP and determine that the game has finished.", () => {
    expect(
      reducer({ ...initialState, dragging: 3, grid: [0, 1, 2, 7, 4, 5, 6, 3, 8] }, {
        type: ACTION_TYPES.PLAYER_DROP,
        index: 7,
      }),
    ).toEqual({ ...initialState,
      dragging: false,
      grid: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      moves: 1,
      finished: true,
    });
  });

  it("should handle IMAGE_ERROR.", () => {
    expect(
      reducer(undefined, {
        type: ACTION_TYPES.IMAGE_ERROR,
        error: "foobar",
      }),
    ).toEqual({ ...initialState,
      error: "foobar",
    });
  });
});
