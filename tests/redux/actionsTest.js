import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  ACTION_TYPES,
  dragTile,
  dropTile,
  finishGame,
  updateLeaderboard,
  resetGame,
  loadGame,
} from "../../src/actions";
import newGrid from "../../src/utils";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("actions", () => {
  it("should create an action to drag a tile", () => {
    const index = 1;
    const expectedAction = {
      type: ACTION_TYPES.PLAYER_DRAG,
      index,
    };
    expect(dragTile(1)).toEqual(expectedAction);
  });

  it("should create an action to drop a tile", () => {
    const index = 1;
    const expectedAction = {
      type: ACTION_TYPES.PLAYER_DROP,
      index,
    };
    expect(dropTile(1)).toEqual(expectedAction);
  });

  it("should create an action to finish the game", () => {
    const expectedAction = {
      type: ACTION_TYPES.GAME_FINISHED,
    };
    expect(finishGame()).toEqual(expectedAction);
  });

  it("should create an action to update the leaderboard with a new name", () => {
    const name = "foobar";
    const expectedAction = {
      type: ACTION_TYPES.UPDATE_LEADERBOARD,
      name,
    };
    expect(updateLeaderboard(name)).toEqual(expectedAction);
  });

  it("should create an action to reset the game with a" +
      " new random grid that has numbers from 0 to 8", () => {
    const grid = newGrid();
    const expectedAction = {
      type: ACTION_TYPES.GAME_RESET,
      grid,
    };
    const action = resetGame();
    expect(action.type).toEqual(expectedAction.type);
    expect(action.grid).toEqual(expect.arrayContaining(grid));
  });

  it("should create an action to load the game and send" +
      " an error from an invalid image", () => {
    const event = {
      target: {
        files: [
          { foo: "bar" },
        ],
      },
    };
    const store = mockStore({});
    const expectedActions = [{
      type: ACTION_TYPES.GAME_LOADING,
    }, {
      type: ACTION_TYPES.IMAGE_ERROR,
      error: "Image not valid.",
    }];

    window.Image.prototype.width = 0;
    window.Image.prototype.height = 0;

    loadGame(event);

    return store.dispatch(loadGame(event)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("should create an action to load the game and send" +
      " a new grid from a valid image", () => {
    const event = {
      target: {
        files: [
          { foo: "bar" },
        ],
      },
    };
    const store = mockStore({});
    const expectedActions = [{
      type: ACTION_TYPES.GAME_LOADING,
    }, {
      type: ACTION_TYPES.GAME_LOADED,
    }];

    window.Image.prototype.width = 1;
    window.Image.prototype.height = 1;

    loadGame(event);

    return store.dispatch(loadGame(event)).then(() => {
      const actions = store.getActions();
      const grid = newGrid();
      expect(actions[0]).toEqual(expectedActions[0]);
      expect(actions[1].type).toEqual(expectedActions[1].type);
      expect(actions[1].grid).toEqual(expect.arrayContaining(grid));
      expect(actions[1].image).toBeInstanceOf(window.Image);
    });
  });
});
