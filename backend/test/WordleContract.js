const WordleContract = artifacts.require('WordleContract.sol');

contract('wordle', addresses => {
    const [admin, player1, player2, player3, player4, player5, player6, _] = addresses;
    it('Test 1', async () => {
        const wordle = await WordleContract.new(admin);

        //await wordle.updateWord(0, { from: admin });

        const p11 = await wordle.checkWord("dummy", { from: player1 });
        console.log(p11.logs[0].args['1']);
        assert(p11.logs[0].args['1'] === "22222");

        const p21 = await wordle.checkWord("soare", { from: player2 });
        assert(p21.logs[0].args['1'] === '00000')
        const p22 = await wordle.checkWord("dummy", { from: player2 });
        assert(p22.logs[0].args['1'] === '22222')

        const p31 = await wordle.checkWord("mimic", { from: player3 });
        assert(p31.logs[0].args['1'] === '10200')
        const p32 = await wordle.checkWord("stair", { from: player3 });
        assert(p32.logs[0].args['1'] === '00000')
        const p33 = await wordle.checkWord("dummy", { from: player3 });
        assert(p33.logs[0].args['1'] === '22222')

        const p41 = await wordle.checkWord("eight", { from: player4 });
        assert(p41.logs[0].args['1'] === '00000')
        const p42 = await wordle.checkWord("pause", { from: player4 });
        assert(p42.logs[0].args['1'] === '00100')
        const p43 = await wordle.checkWord("route", { from: player4 });
        assert(p43.logs[0].args['1'] === '00100')
        const p44 = await wordle.checkWord("dummy", { from: player4 });
        assert(p44.logs[0].args['1'] === '22222')


    })


});