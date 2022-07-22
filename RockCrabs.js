package funzLeveling;

import java.awt.Color;
import java.awt.Graphics2D;
import java.util.Random;
import simple.api.script.Category;
import simple.api.script.ScriptManifest;
import simple.api.coords.WorldArea;
import simple.api.coords.WorldPoint;
import simple.api.events.ChatMessageEvent;
import simple.api.filters.SimpleSkills;
import simple.api.listeners.SimpleMessageListener;
import simple.api.queries.SimpleEntityQuery;
import simple.api.queries.SimpleItemQuery;
import simple.api.wrappers.*;
import simple.api.script.Script;
import simple.api.script.interfaces.SimplePaintable;


@ScriptManifest(author = "freakzoid", category = Category.OTHER, description = "", discord = "Funrun#0001",
name = "FunzKillingV", servers = { "Xeros" }, version = "1")
public class Main extends Script implements SimplePaintable, SimpleMessageListener {
	
    public static final WorldArea homeZone = new WorldArea(
            new WorldPoint(3101, 3499, 0), new WorldPoint(3101, 3487, 0),
            new WorldPoint(3088, 3487, 0), new WorldPoint(3088, 3499, 0));

    public static final WorldArea rockCrabsZone = new WorldArea(
            new WorldPoint(2655, 3736, 0),
            new WorldPoint(2691, 3709, 0));
	
	public boolean startUp = true;
	
	public long startTime = 0;
	
	public int getRand(int min, int max) {
	    Random random = new Random();
	    //System.out.println(random.nextInt(max - min+1) + min);
	    return random.nextInt(max - min+1) + min;
	}
	@Override
	public void onChatMessage(ChatMessageEvent arg0) {
		// TODO Auto-generated method stub5
	}

	@Override
	public void onPaint(Graphics2D g) {
		// TODO Auto-generated method stub
				g.setColor(Color.decode("#666666"));
		        g.fillRect(5, 2, 192, 40);
		        g.setColor(Color.decode("#ff63bf"));
		        g.drawRect(5, 2, 192, 40);
		        g.drawLine(8, 24, 194, 24);
		        g.setColor(Color.decode("#ff0000"));
		        g.drawString("FunzKillingCrabs                      v. " + "1", 7, 20);
		        
		        
		        g.setColor(Color.decode("#ffa500"));
		        g.drawString("Time: " + ctx.paint.formatTime(System.currentTimeMillis() - startTime), 7, 42);
		
	}

	@Override
	public boolean onExecute() {
		startTime = System.currentTimeMillis();
   	 //Instantiating the URL class
   	return true;
	}

	@Override
	public void onProcess() {
		if (startUp == true) {
			startUpSeq();
		}
		if (homeZone.containsPoint(ctx.players.getLocal())) {
            return;
        }	
		if(rockCrabsZone.containsPoint(ctx.players.getLocal())) {
			 if (!ctx.players.getLocal().inCombat() || ctx.players.getLocal().getInteracting() == null) {
				 if (ctx.skills.getRealLevel(SimpleSkills.Skill.ATTACK) >= 80) {
					 if (ctx.skills.getRealLevel(SimpleSkills.Skill.RANGED) >= 80) { 
					 }
					 else if (ctx.skills.getRealLevel(SimpleSkills.Skill.RANGED) >= 40) {
						 if (ctx.equipment.populate().filter(868).next()==null) {
							 SimpleItemQuery<SimpleItem> ironThrow = ctx.inventory.populate().filter(868);
							 if (ironThrow.next()==null) {
								 ctx.magic.castHomeTeleport();
								 ctx.stopScript();
								 
							 }
				             ctx.onCondition(() -> ironThrow.next().interact(454),1000);	
				             ctx.menuActions.sendAction(646, 0, 0, 4454);
						 }
						 else {
							 ctx.sleep(getRand(1450,25421));
							 SimpleNpc fm = npcs(100).filter((n) -> n.getInteracting() != null && n.getInteracting().equals(ctx.players.getLocal()) && n.inCombat()).nearest().next();
							 SimpleNpc npc = fm != null ? fm : npcs(100).nearest().next();
							 if (npc == null) {
								 ctx.prayers.disableAll();
								 return;
							 }
							 npc.interact("attack");
							 ctx.onCondition(() -> ctx.players.getLocal().inCombat(), 500, 10); 
						 }
					 }
					 else {
						 if (ctx.equipment.populate().filter(863).next()==null) {
							 SimpleItemQuery<SimpleItem> runeThrow = ctx.inventory.populate().filter(863);
							 if (runeThrow.next()==null) {
								 ctx.magic.castHomeTeleport();
								 ctx.stopScript();
								 
							 }	
				             ctx.onCondition(() -> runeThrow.next().interact(454),1000);	
				             ctx.menuActions.sendAction(646, 0, 0, 4454);
						 }
						 else {
							 ctx.sleep(getRand(1450,25421));
							 SimpleNpc fm = npcs(100).filter((n) -> n.getInteracting() != null && n.getInteracting().equals(ctx.players.getLocal()) && n.inCombat()).nearest().next();
							 SimpleNpc npc = fm != null ? fm : npcs(100).nearest().next();
							 if (npc == null) {
								 ctx.prayers.disableAll();
								 return;
							 }
							 npc.interact("attack");
							 ctx.onCondition(() -> ctx.players.getLocal().inCombat(), 250, 12);
						 }
					 } 
				 }
				 else {
					 //checks if level 40 or higher to use rune scim
					 if (ctx.skills.getRealLevel(SimpleSkills.Skill.ATTACK) >= 40) {
						 if (ctx.equipment.populate().filter(1333).next()==null) {
				                ctx.onCondition(() -> ctx.inventory.populate().filter(1333).next().interact(454),1000); 
						 }
					 }
					 ctx.sleep(getRand(1450,25421));
					 SimpleNpc fm = npcs(100).filter((n) -> n.getInteracting() != null && n.getInteracting().equals(ctx.players.getLocal()) && n.inCombat()).nearest().next();
					 SimpleNpc npc = fm != null ? fm : npcs(100).nearest().next();
					 if (npc == null) {
						 ctx.prayers.disableAll();
						 return;
					 }
					 npc.interact("attack");
					 ctx.onCondition(() -> ctx.players.getLocal().inCombat(), 250, 12);
				 	}
	         	}
			return;
		}
	}
	@Override
	public void onTerminate() {
		// TODO Auto-generated method stub
	}
	public void startUpSeq() {
		if (!homeZone.containsPoint(ctx.players.getLocal())) {
			ctx.magic.castHomeTeleport();
			ctx.sleep(1250);
        }
		final SimpleNpc banker = ctx.npcs.populate().filter("Trading Clerk").filterHasAction("Bank").nearest().next();
		if (banker != null) {
            if (banker.interact(20)) {
                ctx.onCondition(() -> ctx.bank.bankOpen(), 1250, 5);
                ctx.onCondition(() -> ctx.bank.depositInventory(),1000,5);
                ctx.onCondition(() -> ctx.bank.withdraw(1169, 1),1000,5);
                ctx.onCondition(() -> ctx.bank.withdraw(1129, 1),1000,5);
                ctx.onCondition(() -> ctx.bank.withdraw(1095, 1),1000,5);
                ctx.onCondition(() -> ctx.bank.withdraw(863, 100),1000,5);
                ctx.onCondition(() -> ctx.bank.withdraw(868, 100),1000,5);
                ctx.onCondition(() -> ctx.bank.withdraw(1323, 1),1000,5);
                ctx.onCondition(() -> ctx.bank.withdraw(1333, 1),1000,5);
                ctx.onCondition(() -> ctx.bank.closeBank(),1000,5);
                
                SimpleItem helm = ctx.inventory.populate().filter(1169).next();
                SimpleItem body = ctx.inventory.populate().filter(1129).next();
                SimpleItem legs = ctx.inventory.populate().filter(1095).next();
                SimpleItem ironScim = ctx.inventory.populate().filter(1323).next();
                
                ctx.onCondition(() -> helm.interact(454),1000,5);
                ctx.onCondition(() -> body.interact(454),1000,5);
                ctx.onCondition(() -> legs.interact(454),1000,5);
                ctx.onCondition(() -> ironScim.interact(454),1000,5);
                ctx.menuActions.sendAction(646, 0, 0, 2431);
                ctx.teleporter.teleportStringPath("Monsters", "Rock Crabs");
                ctx.menuActions.sendAction(10000, 0, 0, 45354);
                ctx.sleep(getRand(2437,7231));

            }
        }
		startUp = false;
	}
	
	public final SimpleEntityQuery<SimpleNpc> npcs(int npcVal) {
        return ctx.npcs.populate().filter(npcVal).filter((n) -> {
            if (n == null) {
                return false;
            }
            if (n.getId() == 10) return false;
            if (n.getLocation().distanceTo(ctx.players.getLocal().getLocation()) > 14) {
                return false;
            }
            if (n.inCombat() && n.getInteracting() != null && !n.getInteracting().equals(ctx.players.getLocal())) {
                return false;
            }
            if (n.isDead()) {
                return false;
            }
            return true;
        });
    }
}
